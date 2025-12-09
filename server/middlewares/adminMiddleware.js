const AppError = require('../utils/AppError');

const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    next(new AppError('Access Denied: Admins only.', 403));
  }
};

module.exports = { adminOnly };