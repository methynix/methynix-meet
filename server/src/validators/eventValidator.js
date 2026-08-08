const Joi = require('joi');

const createEventSchema = Joi.object({
  title: Joi.string().min(5).max(100).required(),
  description: Joi.string().min(10).required(),
  eventDate: Joi.date().greater('now').required().messages({
    'date.greater': 'Event date must be in the future',
  }),
  location: Joi.object({
    coordinates: Joi.array().items(Joi.number()).length(2).required(), // [long, lat]
    address: Joi.string().optional()
  }).required()
});

module.exports = { createEventSchema };