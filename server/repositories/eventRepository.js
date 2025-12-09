const Event = require('../models/Event');

const createEvent = async (eventData) => {
  return await Event.create(eventData);
};

const findEventsByLocation = async (long, lat, distance) => {
  return await Event.findNearby(long, lat, distance);
};

const findEventById = async (id) => {
  return await Event.findById(id).populate('organizer', 'name contact');
};

const addAttendee = async (eventId, userId) => {
  return await Event.findByIdAndUpdate(
    eventId,
    { $addToSet: { attendees: userId } }, 
    { new: true }
  );
};

module.exports = {
  createEvent,
  findEventsByLocation,
  findEventById,
  addAttendee
};