const express = require('express');
const calendarControllers = require('../controllers/calendar');

const router = express.Router();

router.get('/tryme', calendarControllers.getTry);

module.exports = router;
