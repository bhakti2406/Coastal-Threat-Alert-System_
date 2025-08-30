import React from 'react';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Globe,
  Check,
  Phone,
  AlertTriangle,
  Anchor,
  Shield,
  Zap
} from 'lucide-react';

const Settings = ({ user, gamification }) => (
  <div className="p-4 space-y-4">
    <h2 className="text-xl font-bold flex items-center">
      <SettingsIcon className="w-6 h-6 mr-2 text-gray-600" />
      Settings & Preferences
    </h2>

    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-5">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <User className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-xl font-bold">{user.name}</h3>
          <p className="opacity-90">{user.level}</p>
          <div className="flex items-center space-x-4 text-sm mt-2">
            <span>{user.points} Points</span>
            <span>Level 7</span>
            <span>{gamification.badges.length} Badges</span>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-2xl shadow p-5">
      <h3 className="font-semibold mb-4 flex items-center">
        <Bell className="w-5 h-5 mr-2 text-blue-600" />
        Smart Notifications
      </h3>
      <div className="space-y-4">
        {[
          { id: 'push', label: 'Push Notifications', desc: 'Instant alerts for threats', enabled: true },
          { id: 'sms', label: 'SMS Emergency Alerts', desc: 'Critical alerts via SMS', enabled: true },
          { id: 'ai', label: 'AI Predictions', desc: 'ML-powered early warnings', enabled: true },
          { id: 'community', label: 'Community Reports', desc: 'Updates from other users', enabled: false },
          { id: 'gamification', label: 'Achievement Notifications', desc: 'Points, badges, and levels', enabled: true }
        ].map(setting => (
          <div key={setting.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <div className="font-semibold">{setting.label}</div>
              <div className="text-xs text-gray-600">{setting.desc}</div>
            </div>
            <button className={`w-12 h-6 rounded-full ${setting.enabled ? 'bg-blue-600' : 'bg-gray-300'} relative transition-colors`}>
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${setting.enabled ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
            </button>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-white rounded-2xl shadow p-5">
      <h3 className="font-semibold mb-4 flex items-center">
        <Globe className="w-5 h-5 mr-2 text-blue-600" />
        Language & Region
      </h3>
      <div className="space-y-2">
        {[
          { code: 'en', name: 'English', flag: '🇺🇸' },
          { code: 'hi', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
          { code: 'gu', name: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' }
        ].map(lang => (
          <button
            key={lang.code}
            className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-all flex items-center justify-between"
          >
            <div className="flex items-center">
              <span className="text-2xl mr-3">{lang.flag}</span>
              <span className="font-semibold">{lang.name}</span>
            </div>
            <Check className="w-5 h-5 text-blue-600" />
          </button>
        ))}
      </div>
    </div>

    <div className="bg-white rounded-2xl shadow p-5">
      <h3 className="font-semibold mb-4 flex items-center">
        <Phone className="w-5 h-5 mr-2 text-red-600" />
        Emergency Hotlines
      </h3>
      <div className="space-y-3">
        {[
          { name: 'National Disaster Response', number: '108', color: 'red', icon: AlertTriangle },
          { name: 'Coast Guard Rescue', number: '1554', color: 'blue', icon: Anchor },
          { name: 'Police Emergency', number: '100', color: 'green', icon: Shield },
          { name: 'Fire Services', number: '101', color: 'orange', icon: Zap }
        ].map(contact => {
          const IconComponent = contact.icon;
          return (
            <div key={contact.number} className={`flex items-center justify-between p-4 bg-${contact.color}-50 rounded-xl`}>
              <div className="flex items-center">
                <div className={`bg-${contact.color}-500 text-white p-2 rounded-full mr-3`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold">{contact.name}</div>
                  <div className="text-sm text-gray-600">24/7 Emergency Service</div>
                </div>
              </div>
              <button className={`bg-${contact.color}-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-${contact.color}-700 transition-colors`}>
                Call {contact.number}
              </button>
            </div>
          );
        })}
      </div>
    </div>

    <div className="bg-white rounded-2xl shadow p-5">
      <h3 className="font-semibold mb-4">Data & Privacy</h3>
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span>Location Services</span>
          <span className="text-green-600 font-semibold">Enabled</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Data Usage</span>
          <span className="text-blue-600">2.3 MB today</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Offline Mode Available</span>
          <span className="text-green-600">Yes</span>
        </div>
      </div>
    </div>
  </div>
);

export default Settings;
