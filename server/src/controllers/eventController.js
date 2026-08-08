const eventService = require('../services/eventService');
const asyncHandler = require('../middlewares/asyncHandler');

const getAllEvents = asyncHandler(async (req, res) => {
  const events = await eventService.getAllEvents();
  res.status(200).json({ success: true, count: events.length, data: events });
});

const createEvent = asyncHandler(async (req, res) => {
  const event = await eventService.createNewEvent(req.body, req.user._id);
  res.status(201).json({ success: true, data: event });
});

const getEventsNearMe = asyncHandler(async (req, res) => {
  const { long, lat } = req.query;
  if (!long || !lat) throw new Error('Location required');

  const events = await eventService.getNearbyEvents(Number(long), Number(lat));
  res.status(200).json({ success: true, count: events.length, data: events });
});

const joinEvent = asyncHandler(async (req, res) => {
  await eventService.joinEvent(req.params.id, req.user._id);
  res.status(200).json({ success: true, message: 'Joined successfully' });
});

const deleteEvent = asyncHandler(async (req, res) => {
  await eventService.deleteEvent(req.params.id, req.user._id);
  res.status(200).json({ success: true, message: 'Event deleted and attendees notified' });
});

module.exports = { getAllEvents, createEvent, getEventsNearMe, joinEvent, deleteEvent };