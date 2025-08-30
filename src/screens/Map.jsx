import React from 'react';
import { MapPin, AlertTriangle, Shield, Navigation, Satellite, Zap, Radio } from 'lucide-react';

const Map = ({ environmentalData }) => (
  <div className="p-4 space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold flex items-center">
        <MapPin className="w-6 h-6 mr-2 text-blue-600" />
        Advanced Threat Mapping
      </h2>
      <div className="flex space-x-2">
        <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">3D View</button>
        <button className="bg-gray-200 px-3 py-1 rounded-full text-sm">2D</button>
      </div>
    </div>

    {/* Enhanced Interactive Map */}
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 rounded-2xl h-96 mb-4 overflow-hidden">
      <div className="absolute inset-0 p-4">
        <svg viewBox="0 0 350 320" className="w-full h-full">
          <defs>
            <radialGradient id="oceanGrad" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.7" />
            </radialGradient>
            <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#15803d" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          <rect width="350" height="200" fill="url(#oceanGrad)" />
          <path d="M0 160 Q80 140 160 155 T280 160 Q320 170 350 165 L350 320 L0 320 Z" fill="url(#landGrad)" stroke="#059669" strokeWidth="2" />

          <circle cx="100" cy="200" r="8" fill="#16a34a" />
          <text x="100" y="220" textAnchor="middle" fontSize="8" fill="#fff">Kutch</text>
          <circle cx="200" cy="210" r="10" fill="#16a34a" />
          <text x="200" y="232" textAnchor="middle" fontSize="8" fill="#fff">Gandhinagar</text>
          <circle cx="280" cy="205" r="12" fill="#16a34a" />
          <text x="280" y="230" textAnchor="middle" fontSize="8" fill="#fff">Ahmedabad</text>

          <g className="animate-pulse">
            <circle cx="200" cy="180" r="8" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
            <circle cx="200" cy="180" r="15" fill="#3b82f6" fillOpacity="0.3" className="animate-ping" />
            <text x="200" y="200" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="bold">Vidhi</text>
          </g>

          <g className="animate-spin" style={{transformOrigin: '150px 80px', animationDuration: '3s'}}>
            <circle cx="150" cy="80" r="25" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,5" />
            <circle cx="150" cy="80" r="15" fill="#dc2626" fillOpacity="0.6" />
            <text x="150" y="85" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="bold">C3</text>
          </g>

          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#fbbf24" />
            </marker>
          </defs>
          <path d="M80 100 L120 130" stroke="#fbbf24" strokeWidth="3" markerEnd="url(#arrowhead)" />
          <path d="M180 90 L210 140" stroke="#fbbf24" strokeWidth="3" markerEnd="url(#arrowhead)" />

          <path d="M200 180 Q150 220 80 240" stroke="#22c55e" strokeWidth="4" strokeDasharray="8,4" />
          <path d="M200 180 Q240 200 300 220" stroke="#22c55e" strokeWidth="4" strokeDasharray="8,4" />

          <circle cx="150" cy="80" r="60" fill="none" stroke="#dc2626" strokeWidth="2" strokeOpacity="0.4" strokeDasharray="3,3" />
          <circle cx="150" cy="80" r="90" fill="none" stroke="#f97316" strokeWidth="2" strokeOpacity="0.3" strokeDasharray="3,3" />
          <circle cx="150" cy="80" r="120" fill="none" stroke="#eab308" strokeWidth="2" strokeOpacity="0.2" strokeDasharray="3,3" />
        </svg>
      </div>

      <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl p-3 text-xs space-y-2">
        <div className="font-semibold text-gray-800 mb-2">Live Threat Map</div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
          <span>Your Location (GPS)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span>Category 3 Cyclone</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-1 bg-green-500 mr-2"></div>
          <span>Safe Evacuation Route</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-1 bg-yellow-500 mr-2"></div>
          <span>Wind Direction</span>
        </div>
      </div>

      <div className="absolute top-4 right-4 bg-black bg-opacity-50 backdrop-blur-sm text-white rounded-xl p-3 text-xs">
        <div className="flex items-center mb-2">
          <Radio className="w-4 h-4 mr-2 text-green-400" />
          <span>LIVE TRACKING</span>
        </div>
        <div>Wind: {environmentalData.windSpeed.value.toFixed(0)} km/h</div>
        <div>Pressure: {environmentalData.pressure.value} hPa</div>
        <div>Updated: {new Date().toLocaleTimeString()}</div>
      </div>
    </div>

    <div className="grid grid-cols-4 gap-3">
      <button className="bg-red-500 text-white p-3 rounded-xl text-center shadow-lg">
        <AlertTriangle className="w-5 h-5 mx-auto mb-1" />
        <div className="text-xs">Threats</div>
      </button>
      <button className="bg-green-500 text-white p-3 rounded-xl text-center shadow-lg">
        <Shield className="w-5 h-5 mx-auto mb-1" />
        <div className="text-xs">Safe Zones</div>
      </button>
      <button className="bg-blue-500 text-white p-3 rounded-xl text-center shadow-lg">
        <Navigation className="w-5 h-5 mx-auto mb-1" />
        <div className="text-xs">Routes</div>
      </button>
      <button className="bg-purple-500 text-white p-3 rounded-xl text-center shadow-lg">
        <Satellite className="w-5 h-5 mx-auto mb-1" />
        <div className="text-xs">Satellite</div>
      </button>
    </div>

    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-5">
      <h4 className="font-bold text-lg mb-3 flex items-center">
        <Zap className="w-5 h-5 mr-2" />
        AI-Powered Evacuation Routes
      </h4>
      <div className="space-y-3">
        <div className="bg-white bg-opacity-20 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Route Alpha (Recommended)</span>
            <span className="bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">FASTEST</span>
          </div>
          <div className="text-sm opacity-90 mb-2">NH-8 → Ahmedabad via Sanand • 42 km • Est. 38 min</div>
          <div className="flex justify-between text-xs">
            <span>Traffic: Light</span>
            <span>Road Condition: Good</span>
            <span>Safety Score: 9.2/10</span>
          </div>
        </div>

        <div className="bg-white bg-opacity-15 rounded-xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold">Route Beta</span>
            <span className="bg-blue-400 text-white px-2 py-1 rounded-full text-xs">ALTERNATE</span>
          </div>
          <div className="text-sm opacity-90 mb-2">SH-6 → Gandhinagar via Kalol • 35 km • Est. 45 min</div>
          <div className="flex justify-between text-xs">
            <span>Traffic: Moderate</span>
            <span>Road Condition: Fair</span>
            <span>Safety Score: 8.1/10</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Map;
