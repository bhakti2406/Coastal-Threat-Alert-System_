const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  type: { type: String, required: true },
  severity: { type: String, required: true, enum: ['critical', 'high', 'medium', 'low'] },
  title: { type: String, required: true },
  description: { type: String, required: true },
  eta: String,
  distance: String,
  confidence: Number,
  affectedPopulation: String,
  evacuationZones: [String],
  emergencyContacts: [String],
  source: String,
  aiPrediction: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alert', alertSchema);
