const AppError = require('../utils/AppError');

const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const data = req[source];
    const { error, value } = schema.validate(data, { abortEarly: false });

    if (error) {
      const messages = error.details.map(e => e.message);
      return next(new AppError(`Validation error: ${messages.join(', ')}`, 400));
    }

    req[source] = value;
    next();
  };
};

module.exports = validate;
