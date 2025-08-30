import React from 'react';
import {
  AlertTriangle,
  X,
  Target,
  Phone,
  Users,
  Navigation,
  Share2
} from 'lucide-react';

const AlertDetails = ({ alerts, setCurrentScreen, getSeverityColor, getAlertIcon }) => {
  const alert = alerts[0];
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-red-600" />
          Critical Alert Details
        </h2>
        <button onClick={() => setCurrentScreen('dashboard')} className="bg-gray-200 p-2 rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className={`bg-gradient-to-r ${getSeverityColor(alert.severity)} text-white rounded-2xl p-6`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {getAlertIcon(alert.type)}
            <div className="ml-3">
              <h3 className="text-xl font-bold">{alert.title}</h3>
              <p className="text-sm opacity-90">{alert.source} • {alert.timestamp.toLocaleTimeString()}</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{alert.confidence}%</div>
            <div className="text-xs opacity-80">AI Confidence</div>
          </div>
        </div>
        <p className="text-lg">{alert.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow p-4">
          <h4 className="font-semibold mb-3 text-center">Impact Assessment</h4>
          <div className="space-y-3 text-center">
            <div>
              <div className="text-2xl font-bold text-red-600">{alert.affectedPopulation}</div>
              <div className="text-xs text-gray-600">People at Risk</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{alert.evacuationZones.length}</div>
              <div className="text-xs text-gray-600">Evacuation Zones</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <h4 className="font-semibold mb-3 text-center">Timeline</h4>
          <div className="space-y-3 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{alert.eta}</div>
              <div className="text-xs text-gray-600">Estimated Arrival</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{alert.distance}</div>
              <div className="text-xs text-gray-600">Current Distance</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-5">
        <h4 className="font-semibold mb-4 flex items-center">
          <Target className="w-5 h-5 mr-2 text-orange-600" />
          Evacuation Zones
        </h4>
        <div className="space-y-3">
          {alert.evacuationZones.map((zone, index) => (
            <div
              key={index}
              className={`p-3 rounded-xl border-l-4 ${
                index === 0 ? 'border-red-500 bg-red-50' : index === 1 ? 'border-orange-500 bg-orange-50' : 'border-yellow-500 bg-yellow-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{zone}</div>
                  <div className="text-sm text-gray-600">
                    {index === 0
                      ? 'Immediate evacuation required'
                      : index === 1
                      ? 'Prepare for evacuation'
                      : 'Monitor situation closely'}
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    index === 0
                      ? 'bg-red-500 text-white'
                      : index === 1
                      ? 'bg-orange-500 text-white'
                      : 'bg-yellow-500 text-black'
                  }`}
                >
                  {index === 0 ? 'URGENT' : index === 1 ? 'PREPARE' : 'WATCH'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl p-5">
        <h4 className="font-semibold mb-4 text-center text-lg">🚨 Emergency Action Center</h4>
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-white bg-opacity-20 text-white p-4 rounded-xl text-center hover:bg-opacity-30 transition-all">
            <Phone className="w-6 h-6 mx-auto mb-2" />
            <div className="font-semibold">Call 108</div>
            <div className="text-xs opacity-80">Disaster Response</div>
          </button>
          <button className="bg-white bg-opacity-20 text-white p-4 rounded-xl text-center hover:bg-opacity-30 transition-all">
            <Users className="w-6 h-6 mx-auto mb-2" />
            <div className="font-semibold">Alert Family</div>
            <div className="text-xs opacity-80">Mass Notification</div>
          </button>
          <button className="bg-white bg-opacity-20 text-white p-4 rounded-xl text-center hover:bg-opacity-30 transition-all">
            <Navigation className="w-6 h-6 mx-auto mb-2" />
            <div className="font-semibold">Start Navigation</div>
            <div className="text-xs opacity-80">To Safety</div>
          </button>
          <button className="bg-white bg-opacity-20 text-white p-4 rounded-xl text-center hover:bg-opacity-30 transition-all">
            <Share2 className="w-6 h-6 mx-auto mb-2" />
            <div className="font-semibold">Share Alert</div>
            <div className="text-xs opacity-80">Social Media</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDetails;
