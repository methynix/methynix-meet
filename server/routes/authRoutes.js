const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middlewares/validatorMiddleware');
const { registerSchema, loginSchema } = require('../validators/authValidator');
const { protect } = require('../middlewares/authMiddleware');

// Public Routes
router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

// Protected Routes
// We need this for the Notification Bell in the RootLayout
router.get('/notifications', protect, authController.getMyNotifications);

module.exports = router;