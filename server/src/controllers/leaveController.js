const Leave = require('../models/Leave');
const Employee = require('../models/Employee');
const fs = require('fs');
const path = require('path');

// Create leave
exports.createLeave = async (req, res) => {
  try {
    const { employeeId, leaveType, startDate, endDate } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: 'Leave document is required' });
    }
    const documentUrl = req.file.path;

    // Check if employee exists and is present
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const leave = new Leave({
      employee: employeeId,
      leaveType,
      startDate,
      endDate,
      documentUrl,
      status: 'pending'
    });

    await leave.save();
    res.status(201).json(leave);
  } catch (err) {
    console.error('Create leave error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update leave status
exports.updateLeaveStatus = async (req, res) => {
  try {
    const leaveId = req.params.id;
    const { status } = req.body;
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const leave = await Leave.findByIdAndUpdate(leaveId, { status }, { new: true });
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }
    res.json(leave);
  } catch (err) {
    console.error('Update leave status error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get approved leaves for calendar
exports.getApprovedLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ status: 'approved' })
      .populate('employee', 'name email phone role')
      .sort({ startDate: 1 });
    res.json(leaves);
  } catch (err) {
    console.error('Get approved leaves error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Download leave document
exports.downloadDocument = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }
    const filePath = path.resolve(leave.documentUrl);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Document file not found' });
    }
    res.download(filePath, `leave_document_${leave._id}.pdf`);
  } catch (err) {
    console.error('Download document error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
