const authService = require('../services/authService');
const asyncHandler = require('../middlewares/asyncHandler');

const register = asyncHandler(async (req, res) => {
  const { user, token } = await authService.register(req.body);
  res.status(201).json({ success: true, token, data: user });
});

const login = asyncHandler(async (req, res) => {
  const { user, token } = await authService.login(req.body.email, req.body.password);
  res.status(200).json({ success: true, token, data: user });
});

const getMyNotifications = asyncHandler(async (req, res) => {
  const notifications = await authService.getUserNotifications(req.user._id);
  
  res.status(200).json({
    success: true,
    count: notifications.length,
    data: notifications
  });
});

module.exports = { register, login ,getMyNotifications};