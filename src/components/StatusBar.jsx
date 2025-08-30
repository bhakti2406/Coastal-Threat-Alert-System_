import React from 'react';
import { Wifi, Satellite, Battery } from 'lucide-react';

const StatusBar = ({ isOnline, batteryLevel }) => (
  <div className="flex items-center justify-between text-xs text-white bg-black bg-opacity-20 px-4 py-1">
    <div className="flex items-center space-x-2">
      <span>9:41</span>
      <div className="flex items-center space-x-1">
        {isOnline ? (
          <Wifi className="w-3 h-3" />
        ) : (
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        )}
        <Satellite className="w-3 h-3" />
        <span className="text-green-400">GPS</span>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <Battery className={`w-4 h-4 ${batteryLevel < 20 ? 'text-red-400' : 'text-green-400'}`} />
      <span>{batteryLevel}%</span>
    </div>
  </div>
);

export default StatusBar;
