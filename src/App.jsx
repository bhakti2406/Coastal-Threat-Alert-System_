import React, { useState, useEffect } from 'react';
import {
  Anchor,
  Bell,
  AlertTriangle,
  Wind,
  Waves,
  Shield
} from 'lucide-react';
import StatusBar from './components/StatusBar';
import BottomNavigation from './components/BottomNavigation';
import Dashboard from './screens/Dashboard';
import Map from './screens/Map';
import Report from './screens/Report';
import Settings from './screens/Settings';
import AlertDetails from './screens/AlertDetails';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [user, setUser] = useState({ name: 'Vidhi', points: 1250, level: 'Ocean Guardian' });
  const [userLocation, setUserLocation] = useState({
    lat: 22.3072,
    lng: 70.8022,
    accuracy: 'High',
    lastUpdate: new Date()
  });
  const [isOnline, setIsOnline] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(85);

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'cyclone',
      severity: 'critical',
      title: 'Severe Cyclonic Storm "Biparjoy"',
      description: 'Category 3 cyclone with sustained winds of 120 km/h approaching Kutch coast',
      eta: '4 hours 30 minutes',
      distance: '32 km NW',
      confidence: 94,
      affectedPopulation: '2.3M',
      evacuationZones: ['Zone A (0-2km)', 'Zone B (2-5km)', 'Zone C (5-10km)'],
      emergencyContacts: ['108 - Disaster Response', '1070 - Cyclone Warning'],
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      source: 'IMD Gandhinagar',
      aiPrediction: true
    },
    {
      id: 2,
      type: 'tsunami',
      severity: 'high',
      title: 'Tsunami Advisory',
      description: 'Minor tsunami waves (0.5-1m) possible due to seismic activity',
      eta: '45 minutes',
      distance: '180 km SW',
      confidence: 78,
      affectedPopulation: '850K',
      evacuationZones: ['Coastal Zone (0-500m)'],
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      source: 'INCOIS Hyderabad',
      aiPrediction: false
    }
  ]);

  const [environmentalData, setEnvironmentalData] = useState({
    seaLevel: { value: 2.34, trend: '+0.12', unit: 'm', status: 'rising' },
    windSpeed: { value: 68, trend: '+15', unit: 'km/h', status: 'increasing' },
    temperature: { value: 31.2, trend: '+2.1', unit: '°C', status: 'rising' },
    humidity: { value: 87, trend: '+8', unit: '%', status: 'high' },
    pressure: { value: 996.2, trend: '-4.8', unit: 'hPa', status: 'dropping' },
    waveHeight: { value: 3.8, trend: '+1.2', unit: 'm', status: 'rough' },
    waterQuality: { value: 'Poor', trend: 'declining', unit: 'AQI 165', status: 'unhealthy' },
    visibility: { value: 2.1, trend: '-1.3', unit: 'km', status: 'poor' }
  });

  const [gamification, setGamification] = useState({
    todayReports: 3,
    weeklyGoal: 10,
    badges: ['First Reporter', 'Weather Watcher', 'Community Hero'],
    streak: 7,
    leaderboardRank: 23
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setEnvironmentalData(prev => ({
        ...prev,
        windSpeed: {
          ...prev.windSpeed,
          value: Math.max(0, prev.windSpeed.value + (Math.random() - 0.5) * 5),
          trend: Math.random() > 0.5 ? '+' + Math.floor(Math.random() * 10) : '-' + Math.floor(Math.random() * 5)
        },
        seaLevel: {
          ...prev.seaLevel,
          value: Math.max(0, prev.seaLevel.value + (Math.random() - 0.5) * 0.1),
          trend: Math.random() > 0.3 ? '+0.' + Math.floor(Math.random() * 20) : '-0.' + Math.floor(Math.random() * 10)
        }
      }));

      setUserLocation(prev => ({
        ...prev,
        accuracy: Math.random() > 0.8 ? 'Medium' : 'High',
        lastUpdate: new Date()
      }));

      setBatteryLevel(prev => Math.max(10, prev - Math.floor(Math.random() * 2)));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'from-red-600 to-red-800';
      case 'high':
        return 'from-orange-500 to-red-500';
      case 'medium':
        return 'from-yellow-500 to-orange-500';
      case 'low':
        return 'from-green-500 to-yellow-500';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'cyclone':
        return <Wind className="w-6 h-6" />;
      case 'tsunami':
        return <Waves className="w-6 h-6" />;
      case 'flood':
        return <Waves className="w-6 h-6" />;
      case 'pollution':
        return <AlertTriangle className="w-6 h-6" />;
      default:
        return <Shield className="w-6 h-6" />;
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return (
          <Dashboard
            user={user}
            gamification={gamification}
            alerts={alerts}
            environmentalData={environmentalData}
            setCurrentScreen={setCurrentScreen}
            getSeverityColor={getSeverityColor}
            getAlertIcon={getAlertIcon}
          />
        );
      case 'map':
        return <Map environmentalData={environmentalData} />;
      case 'report':
        return (
          <Report
            user={user}
            setUser={setUser}
            userLocation={userLocation}
            setGamification={setGamification}
          />
        );
      case 'settings':
        return <Settings user={user} gamification={gamification} />;
      case 'alertDetails':
        return (
          <AlertDetails
            alerts={alerts}
            setCurrentScreen={setCurrentScreen}
            getSeverityColor={getSeverityColor}
            getAlertIcon={getAlertIcon}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen pb-24">
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white">
        <StatusBar isOnline={isOnline} batteryLevel={batteryLevel} />
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold flex items-center">
                <Anchor className="w-6 h-6 mr-2" />
                Coastal Sentinel
              </h1>
              <p className="text-sm opacity-90">Protecting Gujarat's Coast with AI</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Bell className={`w-6 h-6 ${alerts.length > 0 ? 'animate-bounce' : ''}`} />
                {alerts.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {alerts.length}
                  </span>
                )}
              </div>
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">{renderScreen()}</div>

      <BottomNavigation
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
        alertCount={alerts.length}
      />
    </div>
  );
};

export default App;
