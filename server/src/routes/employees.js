const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getEmployees,
  editEmployee,
  deleteEmployee,
  assignRole
} = require('../controllers/employeeController');

// @route   GET /api/employees
// @desc    Get employees with filters
// @access  Private (HR)
router.get('/', auth, getEmployees);

// @route   PUT /api/employees/:id
// @desc    Edit employee details
// @access  Private (HR)
router.put('/:id', auth, editEmployee);

// @route   DELETE /api/employees/:id
// @desc    Delete employee
// @access  Private (HR)
router.delete('/:id', auth, deleteEmployee);

// @route   POST /api/employees/:id/assign-role
// @desc    Assign role to employee
// @access  Private (HR)
router.post('/:id/assign-role', auth, assignRole);

module.exports = router;
