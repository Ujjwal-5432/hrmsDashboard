const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getAttendance,
  addOrUpdateAttendance
} = require('../controllers/attendanceController');

router.get('/', auth, getAttendance);

router.post('/', auth, addOrUpdateAttendance);

module.exports = router;
