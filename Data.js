const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  seaLevel: { value: Number, trend: String, unit: String, status: String },
  windSpeed: { value: Number, trend: String, unit: String, status: String },
  temperature: { value: Number, trend: String, unit: String, status: String },
  humidity: { value: Number, trend: String, unit: String, status: String },
  pressure: { value: Number, trend: String, unit: String, status: String },
  waveHeight: { value: Number, trend: String, unit: String, status: String },
  waterQuality: { value: String, trend: String, unit: String, status: String },
  visibility: { value: Number, trend: String, unit: String, status: String },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Data', dataSchema);
