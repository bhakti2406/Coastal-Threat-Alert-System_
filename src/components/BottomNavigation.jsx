import React from 'react';
import { Home, MapPin, Plus, User } from 'lucide-react';

const BottomNavigation = ({ currentScreen, setCurrentScreen, alertCount }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, badge: alertCount },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'report', label: 'Report', icon: Plus, highlight: true },
    { id: 'settings', label: 'Profile', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-95 backdrop-blur-sm border-t border-gray-200 px-4 py-3">
      <div className="flex justify-around max-w-md mx-auto">
        {navItems.map(item => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              className={`relative flex flex-col items-center p-2 rounded-xl transition-all ${
                currentScreen === item.id ? 'text-blue-600 bg-blue-50 scale-110' : 'text-gray-600 hover:text-blue-600'
              } ${item.highlight ? 'bg-green-500 text-white hover:text-white scale-110' : ''}`}
            >
              <IconComponent className="w-6 h-6 mb-1" />
              <span className="text-xs font-semibold">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
