import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Bell,
  Sun,
  Water,
  Leaf,
  Thermometer,
  ShieldAlert,
  Waves,
  MessageSquare,
  Trophy,
  Activity,
  Award,
  Share2,
  X,
  Plus,
  ArrowLeft,
  ChevronsRight,
  User,
  Medal,
  List,
  Target,
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:3001/api';

const CoastalSentinelApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [environmentalData, setEnvironmentalData] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState({});
  const [gamification, setGamification] = useState({});
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [currentAlertToShare, setCurrentAlertToShare] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/dashboard`);
        const { user, alerts, environmentalData, notifications } = response.data;
        setUser(user);
        setAlerts(alerts);
        setEnvironmentalData(environmentalData);
        setNotifications(notifications);
        setGamification({
          todayReports: user.todayReports,
          weeklyGoal: 10,
          badges: user.badges,
          streak: user.streak,
          leaderboardRank: user.leaderboardRank,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleShare = (platform) => {
    const alert = currentAlertToShare;
    if (!alert) {
      // In a real app, you might handle a general share here
      return;
    }

    const message = `🚨 Coastal Alert: ${alert.type} at ${alert.location}!
    \nDescription: ${alert.description}
    \nStay informed with Coastal Sentinel: ${window.location.href}`;

    const encodedMessage = encodeURIComponent(message);
    let shareUrl = '';

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedMessage}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedMessage}`;
        break;
      case 'linkedin':
        // LinkedIn share URL is more about sharing a link
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(alert.type)}`;
        break;
      case 'instagram':
        // Instagram does not have a public web share API, so advise manual sharing
        alert("Instagram does not support direct web sharing. Please copy the link and share it in your story or feed.");
        setShowShareOptions(false);
        return;
      default:
        return;
    }
    window.open(shareUrl, '_blank');
    setShowShareOptions(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical':
        return 'bg-red-500 text-white';
      case 'advisory':
        return 'bg-yellow-400 text-slate-900';
      case 'info':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'critical':
        return <ShieldAlert size={20} className="mr-2" />;
      case 'advisory':
        return <Waves size={20} className="mr-2" />;
      case 'info':
        return <Bell size={20} className="mr-2" />;
      default:
        return null;
    }
  };

  const dashboardContent = (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <div className="relative">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 bg-slate-700 rounded-full">
            <User size={24} />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg py-2 z-10">
              <div className="px-4 py-2 border-b border-slate-700">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-slate-400">{user.email || 'user@example.com'}</p>
              </div>
              <a href="#" className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-700">Profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-700">Settings</a>
              <a href="#" className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-700">Logout</a>
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-800 p-4 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-2">My Reports & Goals</h3>
        <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
          <span>Reports Today:</span>
          <span className="font-bold text-slate-200">{gamification.todayReports}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
          <span>Weekly Goal:</span>
          <span className="font-bold text-slate-200">{gamification.weeklyGoal}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: `${(gamification.todayReports / gamification.weeklyGoal) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-4">
          <div className="text-center">
            <Medal size={28} className="text-yellow-400 mx-auto mb-1" />
            <p className="text-xs text-slate-400">Streak: {gamification.streak}</p>
          </div>
          <div className="text-center">
            <Trophy size={28} className="text-orange-400 mx-auto mb-1" />
            <p className="text-xs text-slate-400">Rank: {gamification.leaderboardRank}</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 p-4 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Current Alerts</h3>
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <div key={alert.id} className={`p-3 rounded-lg flex items-start mb-2 ${getStatusColor(alert.status)}`}>
              <div className="flex-grow">
                <div className="font-semibold flex items-center">
                  {getStatusIcon(alert.status)} {alert.type}
                </div>
                <p className="text-sm font-medium">{alert.location}</p>
                <p className="text-xs opacity-80 mt-1">{alert.description}</p>
              </div>
              <div className="ml-4 flex-shrink-0">
                <button
                  onClick={() => {
                    setCurrentAlertToShare(alert);
                    setShowShareOptions(true);
                  }}
                  className="p-1 rounded-full bg-white/20 hover:bg-white/40"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-slate-400 text-sm">No new alerts. The coast is clear!</p>
        )}
      </div>

      <div className="bg-slate-800 p-4 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Environmental Data</h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-slate-700 p-3 rounded-lg flex flex-col items-center">
            <Water size={32} className="text-blue-400 mb-1" />
            <p className="text-sm text-slate-400">Sea Level</p>
            <p className="text-lg font-bold">
              {environmentalData['sea-level']?.value || 'N/A'} {environmentalData['sea-level']?.unit}
            </p>
          </div>
          <div className="bg-slate-700 p-3 rounded-lg flex flex-col items-center">
            <Activity size={32} className="text-green-400 mb-1" />
            <p className="text-sm text-slate-400">Water Quality</p>
            <p className="text-lg font-bold">
              {environmentalData['water-quality']?.value || 'N/A'}
            </p>
          </div>
          <div className="bg-slate-700 p-3 rounded-lg flex flex-col items-center">
            <Leaf size={32} className="text-lime-400 mb-1" />
            <p className="text-sm text-slate-400">Air Quality</p>
            <p className="text-lg font-bold">
              {environmentalData['air-quality']?.value || 'N/A'}
            </p>
          </div>
          <div className="bg-slate-700 p-3 rounded-lg flex flex-col items-center">
            <Thermometer size={32} className="text-red-400 mb-1" />
            <p className="text-sm text-slate-400">Temperature</p>
            <p className="text-lg font-bold">
              {environmentalData['temperature']?.value || 'N/A'} {environmentalData['temperature']?.unit}
            </p>
          </div>
        </div>
      </div>

      {showShareOptions && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-6 rounded-lg shadow-xl w-80">
            <h3 className="text-lg font-bold mb-4 text-center">Share this Alert</h3>
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleShare('whatsapp')}
                className="w-full p-3 rounded-lg bg-green-500 text-white font-semibold flex items-center justify-center"
              >
                <i className="fab fa-whatsapp mr-2"></i> WhatsApp
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="w-full p-3 rounded-lg bg-blue-400 text-white font-semibold flex items-center justify-center"
              >
                <i className="fab fa-twitter mr-2"></i> Twitter
              </button>
              <button
                onClick={() => handleShare('linkedin')}
                className="w-full p-3 rounded-lg bg-blue-700 text-white font-semibold flex items-center justify-center"
              >
                <i className="fab fa-linkedin-in mr-2"></i> LinkedIn
              </button>
              <button
                onClick={() => handleShare('instagram')}
                className="w-full p-3 rounded-lg bg-pink-500 text-white font-semibold flex items-center justify-center"
              >
                <i className="fab fa-instagram mr-2"></i> Instagram
              </button>
              <button
                onClick={() => setShowShareOptions(false)}
                className="w-full p-3 rounded-lg bg-slate-700 text-slate-200 font-semibold mt-4"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const ReportScreen = () => {
    const [reportType, setReportType] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleSubmit = async () => {
      if (reportType && description) {
        setIsSubmitting(true);
        try {
          const response = await axios.post(`${API_BASE_URL}/reports`, {
            type: reportType,
            description: description,
            location: 'User-submitted location',
            status: 'advisory',
          });
          setSubmitStatus('success');
          // Reset form after successful submission
          setReportType('');
          setDescription('');
        } catch (error) {
          console.error('Report submission failed:', error);
          setSubmitStatus('error');
        } finally {
          setIsSubmitting(false);
        }
      }
    };

    return (
      <div className="p-4 space-y-6">
        <div className="flex items-center justify-between">
          <button onClick={() => setActiveTab('dashboard')} className="p-2 text-slate-300 rounded-full hover:bg-slate-700">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold text-center">Submit Report</h2>
          <div className="w-8"></div>
        </div>

        <div>
          <label htmlFor="reportType" className="block text-sm font-medium mb-1">
            Report Type
          </label>
          <select
            id="reportType"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a type...</option>
            <option value="Oil Spill">Oil Spill</option>
            <option value="Rip Current">Rip Current</option>
            <option value="Algae Bloom">Algae Bloom</option>
            <option value="Pollution">Pollution</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Provide a detailed description of the event..."
          ></textarea>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full p-3 rounded-lg font-bold transition-colors ${
            isSubmitting ? 'bg-blue-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </button>
        {submitStatus === 'success' && (
          <div className="text-center text-green-400 mt-4">
            Report submitted successfully!
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="text-center text-red-400 mt-4">
            Failed to submit report. Please try again.
          </div>
        )}
      </div>
    );
  };

  const NotificationsScreen = () => {
    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <button onClick={() => setActiveTab('dashboard')} className="p-2 text-slate-300 rounded-full hover:bg-slate-700">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold text-center">Notifications</h2>
          <div className="w-8"></div>
        </div>
        <div className="space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div key={notif.id} className={`p-4 rounded-lg shadow-sm ${notif.read ? 'bg-slate-800' : 'bg-blue-900'}`}>
                <h3 className="font-semibold">{notif.title}</h3>
                <p className={`text-sm mt-1 ${notif.read ? 'text-slate-400' : 'text-slate-200'}`}>{notif.message}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-400">No new notifications.</p>
          )}
        </div>
      </div>
    );
  };

  const GamificationScreen = () => {
    return (
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <button onClick={() => setActiveTab('dashboard')} className="p-2 text-slate-300 rounded-full hover:bg-slate-700">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold text-center">My Achievements</h2>
          <div className="w-8"></div>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Trophy size={20} className="mr-2 text-yellow-400" /> Leaderboard
          </h3>
          <p className="text-sm text-slate-400">Your current rank is: <span className="font-bold text-white">{gamification.leaderboardRank}</span></p>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Award size={20} className="mr-2 text-orange-400" /> Badges
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {gamification.badges && gamification.badges.length > 0 ? (
              gamification.badges.map((badge, index) => (
                <span key={index} className="bg-yellow-500 text-black text-sm px-3 py-1 rounded-full font-bold">
                  {badge}
                </span>
              ))
            ) : (
              <p className="text-sm text-slate-400">No badges earned yet.</p>
            )}
          </div>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Target size={20} className="mr-2 text-green-400" /> Goals
          </h3>
          <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
            <span>Reports submitted this week:</span>
            <span className="font-bold text-slate-200">{gamification.todayReports}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
            <span>Weekly Goal:</span>
            <span className="font-bold text-slate-200">{gamification.weeklyGoal}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div
              className="bg-green-500 h-2.5 rounded-full"
              style={{ width: `${(gamification.todayReports / gamification.weeklyGoal) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  const getActiveTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return dashboardContent;
      case 'report':
        return <ReportScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'gamification':
        return <GamificationScreen />;
      default:
        return dashboardContent;
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-900 text-slate-200 font-sans flex flex-col">
      <div className="flex-grow overflow-y-auto pb-20">
        {getActiveTabContent()}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 flex justify-around items-center p-3 text-sm z-40">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <List size={24} />
          <span className="mt-1">Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab('report')}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === 'report' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <Plus size={24} />
          <span className="mt-1">Report</span>
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === 'notifications' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <Bell size={24} />
          <span className="mt-1">Alerts</span>
        </button>
        <button
          onClick={() => setActiveTab('gamification')}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${activeTab === 'gamification' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <Trophy size={24} />
          <span className="mt-1">Rewards</span>
        </button>
      </div>
    </div>
  );
};

export default CoastalSentinelApp;
