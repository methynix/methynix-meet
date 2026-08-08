const AppError = require('../utils/AppError');

const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return next(new AppError('Only administrators can access this resource', 403));
  }
  next();
};

const adminOnly = isAdmin;

module.exports = { isAdmin, adminOnly };
