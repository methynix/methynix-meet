const User = require('../models/User');
const Event = require('../models/Event');
const asyncHandler = require('../middlewares/asyncHandler');

const getSystemStats = asyncHandler(async (req, res) => {
  const userCount = await User.countDocuments();
  const eventCount = await Event.countDocuments();
  const users = await User.find().select('-password').sort('-createdAt').limit(50);
  const events = await Event.find().populate('organizer', 'name email').sort('-createdAt').limit(50);

  res.status(200).json({
    success: true,
    data: {
      stats: { userCount, eventCount },
      users,
      events
    }
  });
});

const deleteEventForce = asyncHandler(async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  // Ideally, send notification here too (reusing logic from eventService)
  res.status(200).json({ success: true, message: 'Event force deleted' });
});

module.exports = { getSystemStats, deleteEventForce };