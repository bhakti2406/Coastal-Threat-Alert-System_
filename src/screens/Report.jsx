import React, { useState } from 'react';
import {
  Camera,
  MapPin,
  Mic,
  Upload,
  Send,
  RefreshCw,
  Eye,
  Waves,
  AlertTriangle,
  Wind,
  Heart,
  Shield
} from 'lucide-react';

const Report = ({ user, setUser, userLocation, setGamification }) => {
  const [reportType, setReportType] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('medium');
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reportTypes = [
    {
      id: 'erosion',
      label: 'Coastal Erosion',
      icon: Waves,
      color: 'blue',
      points: 15,
      description: 'Report unusual coastal erosion patterns'
    },
    {
      id: 'pollution',
      label: 'Marine Pollution',
      icon: AlertTriangle,
      color: 'red',
      points: 20,
      description: 'Oil spills, chemical discharge, debris'
    },
    {
      id: 'weather',
      label: 'Extreme Weather',
      icon: Wind,
      color: 'purple',
      points: 25,
      description: 'Unusual wind, waves, or atmospheric conditions'
    },
    {
      id: 'wildlife',
      label: 'Marine Life Alert',
      icon: Heart,
      color: 'green',
      points: 10,
      description: 'Stranded animals, unusual behavior'
    },
    {
      id: 'infrastructure',
      label: 'Infrastructure Damage',
      icon: Shield,
      color: 'orange',
      points: 15,
      description: 'Damaged sea walls, ports, or coastal structures'
    },
    {
      id: 'tsunami',
      label: 'Tsunami Signs',
      icon: Waves,
      color: 'red',
      points: 50,
      description: 'Unusual water recession or wave patterns'
    }
  ];

  const handleSubmit = () => {
    if (reportType && description) {
      setIsSubmitting(true);
      setTimeout(() => {
        const selectedType = reportTypes.find(t => t.id === reportType);
        setUser(prev => ({ ...prev, points: prev.points + selectedType.points }));
        setGamification(prev => ({
          ...prev,
          todayReports: prev.todayReports + 1,
          streak: prev.streak + 1
        }));
        alert(`Report submitted successfully! You earned ${selectedType.points} points. Thank you for protecting our coast, ${user.name}!`);
        setReportType('');
        setDescription('');
        setAttachments([]);
        setIsSubmitting(false);
        setSeverity('medium');
      }, 2000);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center">
          <Camera className="w-6 h-6 mr-2 text-green-600" />
          Report Coastal Issue
        </h2>
        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
          +{reportTypes.find(t => t.id === reportType)?.points || 0} Points
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-3">What are you reporting?</label>
        <div className="grid grid-cols-2 gap-3">
          {reportTypes.map(type => {
            const IconComponent = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setReportType(type.id)}
                className={`p-4 rounded-2xl border-2 text-left transition-all transform hover:scale-105 ${
                  reportType === type.id
                    ? `border-${type.color}-500 bg-gradient-to-br from-${type.color}-50 to-${type.color}-100 shadow-lg`
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className={`w-6 h-6 text-${type.color}-600`} />
                  <span className="text-xs font-bold text-green-600">+{type.points}</span>
                </div>
                <div className="text-sm font-semibold mb-1">{type.label}</div>
                <div className="text-xs text-gray-600">{type.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what you observed in detail. Include time, weather conditions, and any other relevant information..."
          className="w-full p-4 border border-gray-200 rounded-xl resize-none h-32 focus:border-blue-500 focus:outline-none transition-colors"
        />
        <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
          <span>{description.length}/500 characters</span>
          <span>Detailed reports earn bonus points!</span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            <div>
              <div className="font-semibold">Current Location</div>
              <div className="text-xs opacity-90">
                {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-xs px-2 py-1 rounded-full ${
              userLocation.accuracy === 'High' ? 'bg-green-500' : 'bg-orange-500'
            }`}>
              {userLocation.accuracy} Accuracy
            </div>
            <div className="text-xs opacity-80 mt-1">
              {userLocation.lastUpdate.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-4">
        <label className="block text-sm font-semibold mb-3">Add Evidence (Bonus Points!)</label>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <button className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition-all transform hover:scale-105">
            <Camera className="w-8 h-8 mb-2 text-blue-500" />
            <span className="text-sm font-semibold">Take Photo</span>
            <span className="text-xs text-green-600">+5 points</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition-all transform hover:scale-105">
            <Mic className="w-8 h-8 mb-2 text-red-500" />
            <span className="text-sm font-semibold">Voice Note</span>
            <span className="text-xs text-green-600">+3 points</span>
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <button className="flex items-center justify-center p-3 border-2 border-dashed border-purple-300 rounded-xl hover:border-purple-400 transition-all">
            <Upload className="w-5 h-5 mr-2 text-purple-500" />
            <span className="text-sm font-semibold">Upload Files</span>
            <span className="text-xs text-green-600 ml-2">+2 points</span>
          </button>
        </div>
      </div>

      {reportType && (
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl p-4">
          <div className="flex items-center mb-3">
            <Eye className="w-5 h-5 mr-2" />
            <span className="font-semibold">AI Suggestions</span>
          </div>
          <div className="text-sm space-y-2">
            <p>• Consider including wind speed measurements</p>
            <p>• Photo from multiple angles increases accuracy</p>
            <p>• Note any changes from previous observations</p>
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!reportType || !description || isSubmitting}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg transform hover:scale-105 disabled:transform-none"
      >
        {isSubmitting ? (
          <>
            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Submit Report & Earn Points
          </>
        )}
      </button>

      <div className="bg-blue-50 rounded-2xl p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Community Impact</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">1,247</div>
            <div className="text-xs text-gray-600">Reports Today</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">94%</div>
            <div className="text-xs text-gray-600">Verified</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">2.3M</div>
            <div className="text-xs text-gray-600">People Helped</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
