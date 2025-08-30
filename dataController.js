const Data = require('../models/Data');

exports.getEnvironmentalData = async (req, res) => {
  try {
    // Fetch the latest environmental data entry
    const latestData = await Data.findOne().sort({ timestamp: -1 });
    if (!latestData) {
      // If no data exists, create a dummy entry
      const dummyData = {
        seaLevel: { value: 2.34, trend: '+0.12', unit: 'm', status: 'rising' },
        windSpeed: { value: 68, trend: '+15', unit: 'km/h', status: 'increasing' },
        temperature: { value: 31.2, trend: '+2.1', unit: '°C', status: 'rising' },
        humidity: { value: 87, trend: '+8', unit: '%', status: 'high' },
        pressure: { value: 996.2, trend: '-4.8', unit: 'hPa', status: 'dropping' },
        waveHeight: { value: 3.8, trend: '+1.2', unit: 'm', status: 'rough' },
        waterQuality: { value: 'Poor', trend: 'declining', unit: 'AQI 165', status: 'unhealthy' },
        visibility: { value: 2.1, trend: '-1.3', unit: 'km', status: 'poor' }
      };
      const newData = await Data.create(dummyData);
      return res.status(200).json(newData);
    }
    res.status(200).json(latestData);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching environmental data', error: err.message });
  }
};
