const Notification = require('../models/Notification');

const createNotification = async (data) => {
  return await Notification.create(data);
};

const insertManyNotifications = async (notificationsArray) => {
  return await Notification.insertMany(notificationsArray);
};

const findNotificationsByUserId = async (userId) => {
  // Fetch last 20 notifications, newest first
  return await Notification.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(20);
};

const markAsRead = async (notificationId) => {
  return await Notification.findByIdAndUpdate(notificationId, { read: true }, { new: true });
};

module.exports = {
  createNotification,
  insertManyNotifications,
  findNotificationsByUserId,
  markAsRead
};