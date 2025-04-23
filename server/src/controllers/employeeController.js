const Employee = require('../models/Employee');

// Get employees with optional filters
exports.getEmployees = async (req, res) => {
  try {
    const { search, role } = req.query;
    let filter = {};
    if (role) {
      filter.role = role;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }
    const employees = await Employee.find(filter).sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    console.error('Get employees error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Edit employee details
exports.editEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const updates = req.body;

    const employee = await Employee.findByIdAndUpdate(employeeId, updates, { new: true });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    console.error('Edit employee error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findByIdAndDelete(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    console.error('Delete employee error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Assign role to employee
exports.assignRole = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const { role } = req.body;
    if (!role) {
      return res.status(400).json({ message: 'Role is required' });
    }
    const employee = await Employee.findByIdAndUpdate(employeeId, { role }, { new: true });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    console.error('Assign role error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
