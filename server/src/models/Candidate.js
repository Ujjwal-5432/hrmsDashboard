const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
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
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  experience:{
    type: Number,
    trim: true,
    default: 0
  },
  resumeUrl: {
    type: String,
    required: true
  },
  position:{
    type: String,
    default: "Fresher"
  },
  status: {
    type: String,
    enum: ['applied', 'selected', 'rejected'],
    default: 'applied'
  }
}, { timestamps: true });

module.exports = mongoose.model('Candidate', CandidateSchema);
