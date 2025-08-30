const Report = require('../models/Report');
const User = require('../models/User');

exports.submitReport = async (req, res) => {
  try {
    const { reportType, description, severity, location, userId, attachments } = req.body;

    // Simulate AI/ML analysis for the report
    // This is where you'd send data to a separate ML model
    const pointsAwarded = Math.floor(Math.random() * 20) + 5; // Simulates point logic

    const newReport = await Report.create({
      reportType,
      description,
      severity,
      location,
      user: userId,
      attachments
    });

    // Update user's gamification stats
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $inc: {
          points: pointsAwarded,
          'gamification.todayReports': 1,
          'gamification.streak': 1 // Assuming one report per day for streak
        }
      },
      { new: true }
    );

    if (!updatedUser) {
      console.error('User not found during report submission');
    }

    res.status(201).json({ 
      message: 'Report submitted successfully!', 
      report: newReport, 
      points: pointsAwarded 
    });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting report', error: err.message });
  }
};
