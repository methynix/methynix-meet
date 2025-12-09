const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { protect } = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validatorMiddleware');
const { createEventSchema } = require('../validators/eventValidator');

// Public Route - MUST be defined before /:id routes
router.get('/nearby', eventController.getEventsNearMe);

// Protected Routes
router.use(protect);

router.post('/', validate(createEventSchema), eventController.createEvent);
router.post('/:id/join', eventController.joinEvent);
router.delete('/:id', eventController.deleteEvent);

module.exports = router;