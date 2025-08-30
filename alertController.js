const Alert = require('../models/Alert');

exports.getAlerts = async (req, res) => {
  try {
    // Fetch all alerts from the database, sorted by timestamp
    const alerts = await Alert.find().sort({ timestamp: -1 });
    res.status(200).json(alerts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching alerts', error: err.message });
  }
};

exports.getAlertById = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    res.status(200).json(alert);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching alert details', error: err.message });
  }
};
