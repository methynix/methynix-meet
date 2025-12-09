const userRepository = require('../repositories/userRepository');
const notificationRepository = require('../repositories/notificationRepository');
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');

// Helper: Sign JWT Token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

/**
 * Register User Logic
 */
const register = async (data) => {
  // 1. Check if user already exists
  const existingUser = await userRepository.findUserByEmail(data.email);
  if (existingUser) {
    throw new AppError('User already exists', 400);
  }

  // 2. Create User
  const newUser = await userRepository.createUser(data);

  // 3. Generate Token
  const token = signToken(newUser._id);
  
  // 4. Sanitize output (remove password)
  newUser.password = undefined;
  
  return { user: newUser, token };
};

/**
 * Login User Logic
 */
const login = async (email, password) => {
  // 1. Check if email & password exist
  if (!email || !password) {
    throw new AppError('Please provide email and password', 400);
  }

  // 2. Check if user exists & password is correct
  // We need to explicitly select password because it's excluded in schema by default
  const user = await userRepository.findUserByEmail(email);

  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new AppError('Incorrect email or password', 401);
  }

  // 3. Generate Token
  const token = signToken(user._id);
  
  // 4. Sanitize output
  user.password = undefined;

  return { user, token };
};

/**
 * Notification Logic
 */
const getUserNotifications = async (userId) => {
  return await notificationRepository.findNotificationsByUserId(userId);
};

module.exports = {
  register,
  login,
  getUserNotifications
};