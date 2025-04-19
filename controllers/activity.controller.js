const { Activity } = require('../models');

// Create activity
exports.createActivity = async (req, res) => {
  try {
    const { customerId, title, note, date } = req.body;

    const newActivity = await Activity.create({ customerId, title, note, date });
    res.status(201).json({ message: 'Activity created.', activity: newActivity });
  } catch (err) {
    res.status(500).json({ message: 'Error creating activity.', error: err.message });
  }
};

// Get all activities
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll();
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching activities.', error: err.message });
  }
};

// Get activity by ID
exports.getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found.' });

    res.status(200).json(activity);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching activity.', error: err.message });
  }
};

// Update activity
exports.updateActivity = async (req, res) => {
  try {
    const { title, note, date } = req.body;
    const activity = await Activity.findByPk(req.params.id);

    if (!activity) return res.status(404).json({ message: 'Activity not found.' });

    await activity.update({ title, note, date });
    res.status(200).json({ message: 'Activity updated.', activity });
  } catch (err) {
    res.status(500).json({ message: 'Error updating activity.', error: err.message });
  }
};

// Delete activity
exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Activity not found.' });

    await activity.destroy();
    res.status(200).json({ message: 'Activity deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting activity.', error: err.message });
  }
};
