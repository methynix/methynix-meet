const Joi = require('joi');

const passwordSchema = Joi.string()
  .min(8)
  .max(128)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]/)
  .required()
  .messages({
    'string.pattern.base': 'Password must contain uppercase, lowercase, number, and special character',
    'string.min': 'Password must be at least 8 characters',
  });

const emailSchema = Joi.string()
  .email()
  .required()
  .lowercase()
  .trim();

const phoneSchema = Joi.string()
  .pattern(/^\+?[1-9]\d{1,14}$/)
  .optional();

const coordinatesSchema = Joi.object({
  latitude: Joi.number().required().min(-90).max(90),
  longitude: Joi.number().required().min(-180).max(180),
});

const validatePassword = (password) => {
  const { error, value } = passwordSchema.validate(password);
  if (error) {
    throw new Error(error.details[0].message);
  }
  return value;
};

const validateEmail = (email) => {
  const { error, value } = emailSchema.validate(email);
  if (error) {
    throw new Error('Invalid email address');
  }
  return value;
};

const validateCoordinates = (lat, lng) => {
  const { error, value } = coordinatesSchema.validate({
    latitude: lat,
    longitude: lng,
  });
  if (error) {
    throw new Error('Invalid coordinates');
  }
  return value;
};

const sanitizeInput = (input) => {
  if (typeof input === 'string') {
    return input.trim().replace(/[<>\"]/g, '');
  }
  return input;
};

const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

module.exports = {
  passwordSchema,
  emailSchema,
  phoneSchema,
  coordinatesSchema,
  validatePassword,
  validateEmail,
  validateCoordinates,
  sanitizeInput,
  isValidObjectId,
};
