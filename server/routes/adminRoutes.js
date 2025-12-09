const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { adminOnly } = require('../middlewares/adminMiddleware');
const adminController = require('../controllers/adminController');

// All routes require Login + Admin Role
router.use(protect, adminOnly);

router.get('/dashboard', adminController.getSystemStats);
router.delete('/event/:id', adminController.deleteEventForce);

module.exports = router;