const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const {
  createLeave,
  updateLeaveStatus,
  getApprovedLeaves,
  downloadDocument
} = require('../controllers/leaveController');

// Multer setup for leave document upload
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/leaves/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// @route   POST /api/leaves
// @desc    Create leave
// @access  Private (HR)
router.post('/', auth, upload.single('document'), createLeave);

// @route   PUT /api/leaves/:id/status
// @desc    Update leave status
// @access  Private (HR)
router.put('/:id/status', auth, updateLeaveStatus);

// @route   GET /api/leaves/approved
// @desc    Get approved leaves for calendar
// @access  Private (HR)
router.get('/approved', auth, getApprovedLeaves);

// @route   GET /api/leaves/:id/document
// @desc    Download leave document
// @access  Private (HR)
router.get('/:id/document', auth, downloadDocument);

module.exports = router;
