const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  if (process.env.NODE_ENV === 'production') {
    err.message = 'Something went wrong, please try again';
    if (err.code === 11000) {
      err.message = 'Duplicate field value entered';
      err.statusCode = 400;
    }
    if (err.name === 'JsonWebTokenError') {
      err.message = 'Invalid token';
      err.statusCode = 401;
    }
    if (err.name === 'TokenExpiredError') {
      err.message = 'Token has expired';
      err.statusCode = 401;
    }
  }

  res.status(err.statusCode).json({
    status: 'error',
    statusCode: err.statusCode,
    message: err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
};

module.exports = errorMiddleware;
