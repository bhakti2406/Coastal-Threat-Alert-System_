// backend/services/notificationService.js
const { Notification, User } = require('../models');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const admin = require('firebase-admin');

class NotificationService {
  constructor(io) {
    this.io = io;
    this.setupEmailTransporter();
    this.setupSMSClient();
    this.setupFirebase();
  }

  setupEmailTransporter() {
    this.emailTransporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  setupSMSClient() {
    if (process.env.TWILIO_SID && process.env.TWILIO_AUTH_TOKEN) {
      this.smsClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
    }
  }

  setupFirebase() {
    try {
      if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
        });
        this.fcm = admin.messaging();
      }
    } catch (error) {
      console.error('Firebase setup error:', error);
    }
  }

  async sendPushNotification(userId, notification) {
    try {
      const user = await User.findById(userId);
      if (!user || !user.preferences.notifications.push) {
        return false;
      }

      // Save notification to database
      const dbNotification = new Notification({
        userId,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        priority: notification.priority,
        actionUrl: notification.actionUrl,
        metadata: notification.metadata
      });
      
      await dbNotification.save();

      // Send via WebSocket (real-time)
      this.io.to(`user_${userId}`).emit('notification', {
        id: dbNotification._id,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        priority: notification.priority,
        timestamp: new Date(),
        actionUrl: notification.actionUrl
      });

      // Send via Firebase FCM if available
      if (this.fcm && user.fcmToken) {
        try {
          await this.fcm.send({
            token: user.fcmToken,
            notification: {
              title: notification.title,
              body: notification.message
            },
            data: {
              type: notification.type,
              priority: notification.priority,
              actionUrl: notification.actionUrl || ''
            },
            android: {
              priority: notification.priority === 'critical' ? 'high' : 'normal',
              notification: {
                channelId: notification.type,
                sound: notification.priority === 'critical' ? 'emergency' : 'default'
              }
            },
            apns: {
              payload: {
                aps: {
                  sound: notification.priority === 'critical' ? 'emergency.wav' : 'default'
                }
              }
            }
          });
          
          dbNotification.channels.push = { sent: true, sentAt: new Date() };
        } catch (fcmError) {
          console.error('FCM error:', fcmError);
          dbNotification.channels.push = { sent: false, error: fcmError.message };
        }
      }

      await dbNotification.save();
      return true;
    } catch (error) {
      console.error('Push notification error:', error);
      return false;
    }
  }

  async sendSMS(phoneNumber, message, priority = 'medium') {
    try {
      if (!this.smsClient) {
        console.warn('SMS client not configured');
        return false;
      }

      const result = await this.smsClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
        priority: priority === 'critical' ? 'high' : undefined
      });

      console.log(`SMS sent successfully: ${result.sid}`);
      return true;
    } catch (error) {
      console.error('SMS error:', error);
      return false;
    }
  }

  async sendEmail(email, subject, htmlContent, priority = 'medium') {
    try {
      await this.emailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        html: htmlContent,
        priority: priority === 'critical' ? 'high' : 'normal'
      });

      return true;
    } catch (error) {
      console.error('Email error:', error);
      return false;
    }
  }

  async sendEmergencyAlert(userId, alert) {
    try {
      const user = await User.findById(userId);
      if (!user) return false;

      const message = `🚨 EMERGENCY ALERT: ${alert.title}\n\n${alert.description}\n\nETA: ${alert.eta}\nCall 108 for immediate help.`;
      const subject = `CRITICAL ALERT: ${alert.title}`;
      
      const emailHtml = `
        <div style="background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 20px; border-radius: 10px; font-family: Arial, sans-serif;">
          <h1 style="margin: 0 0 15px 0;">🚨 EMERGENCY ALERT</h1>
          <h2 style="margin: 0 0 15px 0;">${alert.title}</h2>
          <p style="font-size: 16px; margin: 0 0 20px 0;">${alert.description}</p>
          
          <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>ETA:</strong> ${alert.eta}</p>
            <p><strong>Confidence:</strong> ${alert.confidence}%</p>
            <p><strong>Affected Population:</strong> ${alert.affectedPopulation}</p>
          </div>
          
          <div style="background: rgba(255,255,255,0.9); color: #dc2626; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0;">IMMEDIATE ACTIONS:</h3>
            <ul>
              <li>Call 108 for emergency assistance</li>
              <li>Follow evacuation orders immediately</li>
              <li>Alert family and neighbors</li>
              <li>Move to higher ground if possible</li>
            </ul>
          </div>
          
          <p style="font-size: 14px; opacity: 0.9;">
            This alert was generated by Coastal Sentinel AI system with ${alert.confidence}% confidence.
            Source: ${alert.source}
          </p>
        </div>
      `;

      // Send via all channels for critical alerts
      const promises = [];

      if (user.preferences.notifications.push) {
        promises.push(this.sendPushNotification(userId, {
          title: alert.title,
          message: alert.description,
          type: 'emergency',
          priority: 'critical',
          actionUrl: `/alerts/${alert._id}`
        }));
      }

      if (user.preferences.notifications.sms && user.phone) {
        promises.push(this.sendSMS(user.phone, message, 'critical'));
      }

      if (user.preferences.notifications.email && user.email) {
        promises.push(this.sendEmail(user.email, subject, emailHtml, 'critical'));
      }

      await Promise.all(promises);
      return true;
    } catch (error) {
      console.error('Emergency alert error:', error);
      return false;
    }
  }

  async sendBulkAlert(userIds, alert) {
    try {
      const batchSize = 100;
      const batches = [];
      
      for (let i = 0; i < userIds.length; i += batchSize) {
        batches.push(userIds.slice(i, i + batchSize));
      }

      for (const batch of batches) {
        const promises = batch.map(userId => 
          this.sendEmergencyAlert(userId, alert)
        );
        
        await Promise.all(promises);
        
        // Small delay between batches to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      console.log(`Bulk alert sent to ${userIds.length} users`);
      return true;
    } catch (error) {
      console.error('Bulk alert error:', error);
      return false;
    }
  }

  async sendDailySummary(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) return false;

      const today = new Date();
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

      // Get user's reports from yesterday
      const Report = require('../models').Report;
