const eventRepository = require('../repositories/eventRepository');
const Notification = require('../models/Notification'); // Accessing Model directly for Notification logic to keep it DRY
const AppError = require('../utils/AppError');

/**
 * Get All Events
 */
const getAllEvents = async () => {
  return await eventRepository.findAll();
};

/**
 * Create a new Event
 */
const createNewEvent = async (data, userId) => {
  // Logic: Ensure event date is in the future (Double check aside from Joi)
  if (new Date(data.eventDate) <= new Date()) {
    throw new AppError('Event date must be in the future', 400);
  }

  const eventData = { ...data, organizer: userId };
  return await eventRepository.createEvent(eventData);
};

/**
 * Get Events based on geospatial data
 */
const getNearbyEvents = async (long, lat) => {
  if (!long || !lat) throw new AppError('Coordinates are required', 400);
  
  // Logic: Default search radius 10km (10000 meters)
  const MAX_DISTANCE_METERS = 10000; 
  return await eventRepository.findEventsByLocation(long, lat, MAX_DISTANCE_METERS);
};

/**
 * Join an Event
 */
const joinEvent = async (eventId, userId) => {
  const event = await eventRepository.findEventById(eventId);
  if (!event) throw new AppError('Event not found', 404);
  
  // Logic: Check if event is active
  if (event.status !== 'active' || new Date(event.eventDate) < new Date()) {
    throw new AppError('Transmission closed: Event has ended or is inactive', 400);
  }
  
  // Logic: Organizer cannot join their own event
  if (event.organizer._id.toString() === userId.toString()) {
    throw new AppError('You cannot join your own event', 400);
  }

  // Logic: Prevent duplicate joining
  if (event.attendees.includes(userId)) {
    throw new AppError('You are already on the manifest', 400);
  }

  return await eventRepository.addAttendee(eventId, userId);
};

/**
 * Delete an Event & Notify Attendees
 */
const deleteEvent = async (eventId, userId) => {
  const event = await eventRepository.findEventById(eventId);
  if (!event) throw new AppError('Event not found', 404);

  // Logic: Authorization Check
  if (event.organizer._id.toString() !== userId.toString()) {
    throw new AppError('Unauthorized: You are not the organizer', 403);
  }

  // LOGIC: Notify all attendees before deletion
  if (event.attendees && event.attendees.length > 0) {
    const notifications = event.attendees.map(attendeeId => ({
      user: attendeeId,
      message: `ALERT: The event "${event.title}" has been cancelled by the organizer.`,
      type: 'alert'
    }));
    
    // Bulk insert notifications
    await Notification.insertMany(notifications);
  }

  // Proceed to delete
  // Assuming repository has a delete method, otherwise use model direct or add to repo
  await event.deleteOne(); 
  return true;
};

module.exports = {
  getAllEvents,
  createNewEvent,
  getNearbyEvents,
  joinEvent,
  deleteEvent
};