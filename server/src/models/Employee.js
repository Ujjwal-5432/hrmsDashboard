const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  position:{
    type: String,
  },
  department:{
    type: String,
  },
  dateOfJoining:{
    type: Date,
    default: Date.now(),
  },
  attendance:{
    type: String,
    default: "Absent"
  },
  role: {
    type: String,
    enum: ['Employee', 'Manager', 'HR', 'Admin'],
    default: 'Employee'
  }
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);
