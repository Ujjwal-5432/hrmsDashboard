const Candidate = require('../models/Candidate');
const Employee = require('../models/Employee');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');

// Create candidate
exports.createCandidate = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    console.log(req.body);
    const user = await User.findOne({email: email});
    console.log(user);
    
    if (!req.file) {
      return res.status(400).json({ message: 'Resume file is required' });
    }
    const resumeUrl = req.file.path;

    const candidate = new Candidate({
      name,
      email,
      phone,
      resumeUrl
    });

    await candidate.save();
    res.status(201).json(candidate);
  } catch (err) {
    console.error('Create candidate error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get candidates with optional filters
exports.getCandidates = async (req, res) => {
  try {
    const { status, search } = req.query;
    let filter = {};
    if (status) {
      filter.status = status;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }
    const candidates = await Candidate.find(filter).sort({ createdAt: -1 });
    res.json(candidates);
  } catch (err) {
    console.error('Get candidates error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Download candidate resume
exports.downloadResume = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    const filePath = path.resolve(candidate.resumeUrl);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'Resume file not found' });
    }
    res.download(filePath, `${candidate.name}_resume.pdf`);
  } catch (err) {
    console.error('Download resume error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.status(200).json({ message: 'Candidate deleted successfully' });
  } catch (err) {
    console.error('Delete candidate error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    res.status(200).json({ message: 'Status updated', candidate });
  } catch (err) {
    console.error('Update status error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.moveToEmployee = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    if (candidate.status !== 'selected') {
      return res.status(400).json({ message: 'Candidate is not selected' });
    }

    const employee = new Employee({
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      role: 'Employee'
    });
    await employee.save();
    
    await Candidate.findByIdAndDelete(candidate._id);

    res.json({ message: 'Candidate moved to employee', employee });
  } catch (err) {
    console.error('Move to employee error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};