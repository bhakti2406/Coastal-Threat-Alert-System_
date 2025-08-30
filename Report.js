const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reportType: { type: String, required: true },
  description: { type: String, required: true },
  severity: { type: String, required: true },
  location: {
    lat: Number,
    lng: Number,
    accuracy: String
  },
  attachments: [{
    type: String, // Storing file URLs or paths
    mimetype: String
  }],
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
