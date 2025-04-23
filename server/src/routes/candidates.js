const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const fs = require('fs');

const {
  createCandidate,
  getCandidates,
  downloadResume,
  moveToEmployee,
  deleteCandidate,
  updateStatus
} = require('../controllers/candidateController');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads/resumes');
    fs.mkdirSync(uploadPath, { recursive: true }); 
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.post('/', auth, upload.single('resume'), createCandidate);

router.get('/', auth, getCandidates);

router.get('/:id/resume', auth, downloadResume);

router.delete('/:id', auth, deleteCandidate);

router.put('/:id/status', auth, updateStatus);

// @route   POST /api/candidates/:id/move
// @desc    Move candidate to employee
// @access  Private (HR)
router.post('/:id/move', auth, moveToEmployee);

module.exports = router;
