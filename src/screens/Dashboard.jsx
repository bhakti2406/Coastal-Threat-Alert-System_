import React from 'react';
import {
  Award,
  Zap,
  Clock,
  Target,
  Users,
  Share2,
  Activity,
  RefreshCw,
  TrendingUp,
  MapPin,
  Camera,
  Eye
} from 'lucide-react';

const Dashboard = ({
  user,
  gamification,
  alerts,
  environmentalData,
  setCurrentScreen,
  getSeverityColor,
  getAlertIcon
}) => (
  <div className="p-4 space-y-4">
    {/* Welcome Section with Gamification */}
    <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 text-white rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, {user.name}! 👋</h2>
            <p className="opacity-90">{user.level} • {user.points} Points</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-2">
              <Award className="w-8 h-8 text-yellow-300" />
            </div>
            <span className="text-xs">Rank #{gamification.leaderboardRank}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{gamification.todayReports}</div>
            <div className="text-xs opacity-80">Reports Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{gamification.streak}</div>
            <div className="text-xs opacity-80">Day Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{gamification.badges.length}</div>
            <div className="text-xs opacity-80">Badges Earned</div>
          </div>
        </div>
      </div>
    </div>

    {/* Critical Alerts */}
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center">
          <Zap className="w-5 h-5 mr-2 text-red-500" />
          Active Threats
        </h3>
        <button className="bg-red-500 text-white px-3 py-1 rounded-full text-sm animate-pulse">
          LIVE
        </button>
      </div>

      {alerts.map(alert => (
        <div key={alert.id} className={`bg-gradient-to-r ${getSeverityColor(alert.severity)} text-white rounded-2xl p-5 shadow-lg`}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="bg-white bg-opacity-20 p-2 rounded-full">
                {getAlertIcon(alert.type)}
              </div>
              <div>
                <h4 className="font-bold text-lg">{alert.title}</h4>
                <div className="flex items-center space-x-2 text-sm opacity-90">
                  <span>{alert.source}</span>
                  {alert.aiPrediction && (
                    <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                      AI Enhanced
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right text-sm">
              <div className="font-bold">{alert.confidence}%</div>
              <div className="opacity-80">Confidence</div>
            </div>
          </div>

          <p className="text-sm opacity-95 mb-4">{alert.description}</p>

          <div className="grid grid-cols-3 gap-3 text-xs mb-4">
            <div className="text-center bg-white bg-opacity-20 rounded-lg p-2">
              <Clock className="w-4 h-4 mx-auto mb-1" />
              <div className="font-semibold">ETA</div>
              <div>{alert.eta}</div>
            </div>
            <div className="text-center bg-white bg-opacity-20 rounded-lg p-2">
              <Target className="w-4 h-4 mx-auto mb-1" />
              <div className="font-semibold">Distance</div>
              <div>{alert.distance}</div>
            </div>
            <div className="text-center bg-white bg-opacity-20 rounded-lg p-2">
              <Users className="w-4 h-4 mx-auto mb-1" />
              <div className="font-semibold">Affected</div>
              <div>{alert.affectedPopulation}</div>
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentScreen('alertDetails')}
              className="flex-1 bg-white text-gray-900 py-2 px-4 rounded-xl font-semibold hover:bg-opacity-90 transition-all"
            >
              View Details
            </button>
            <button className="bg-white bg-opacity-20 p-2 rounded-xl">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Environmental Dashboard */}
    <div className="bg-white rounded-2xl shadow-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg flex items-center">
          <Activity className="w-5 h-5 mr-2 text-blue-600" />
          Real-time Coastal Data
        </h3>
        <button className="flex items-center space-x-1 text-blue-600 text-sm">
          <RefreshCw className="w-4 h-4" />
          <span>Live</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {Object.entries(environmentalData).map(([key, data]) => (
          <div key={key} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <div
                className={`flex items-center text-xs ${
                  data.status === 'rising' || data.status === 'increasing'
                    ? 'text-red-500'
                    : data.status === 'dropping' || data.status === 'declining'
                    ? 'text-orange-500'
                    : 'text-green-500'
                }`}
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                {data.trend}
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <span className="text-xl font-bold">{data.value}</span>
                <span className="text-sm text-gray-500 ml-1">{data.unit}</span>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  data.status === 'high' || data.status === 'rough' || data.status === 'unhealthy'
                    ? 'bg-red-100 text-red-700'
                    : data.status === 'poor' || data.status === 'dropping'
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {data.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Quick Actions */}
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={() => setCurrentScreen('map')}
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      >
        <MapPin className="w-8 h-8 mx-auto mb-2" />
        <div className="font-semibold">Threat Map</div>
        <div className="text-xs opacity-80">Live tracking</div>
      </button>
      <button
        onClick={() => setCurrentScreen('report')}
        className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
      >
        <Camera className="w-8 h-8 mx-auto mb-2" />
        <div className="font-semibold">Quick Report</div>
        <div className="text-xs opacity-80">Earn 10 points</div>
      </button>
    </div>

    {/* AI Insights */}
    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-5">
      <div className="flex items-center mb-3">
        <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
          <Eye className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold">AI Coastal Insights</h4>
          <p className="text-xs opacity-90">Powered by Machine Learning</p>
        </div>
      </div>
      <p className="text-sm mb-3">
        Based on satellite imagery and sensor data, storm intensity has increased by 23% in the last 2 hours.
        Recommend immediate evacuation for coastal areas within 5km.
      </p>
      <button className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-xl text-sm font-semibold">
        View Full Analysis
      </button>
    </div>
  </div>
);

export default Dashboard;
