const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

// Get attendance records with optional filters
exports.getAttendance = async (req, res) => {
  try {
    const { date, search } = req.query;
    let filter = {};
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      filter.date = { $gte: start, $lte: end };
    }

    // Only current employees attendance
    const employees = await Employee.find({});
    const employeeIds = employees.map(emp => emp._id);
    filter.employee = { $in: employeeIds };

    if (search) {
      // Search employees by name or email or phone
      const searchedEmployees = await Employee.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } }
        ]
      });
      const searchedIds = searchedEmployees.map(emp => emp._id);
      filter.employee = { $in: searchedIds };
    }

    const attendanceRecords = await Attendance.find(filter)
      .populate('employee', 'name email phone role')
      .sort({ date: -1 });

    res.json(attendanceRecords);
  } catch (err) {
    console.error('Get attendance error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addOrUpdateAttendance = async (req, res) => {
  try {
    const { employeeId, date, newStatus } = req.body;
    if (!employeeId || !date || !newStatus) {
      return res.status(400).json({ message: 'employeeId, date and status are required' });
    }

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    let attendance = await Attendance.findOne({
      employee: employeeId,
      date: attendanceDate
    });

    if (attendance) {
      attendance.attendance = newStatus;
    } else {
      attendance = new Attendance({
        employee: employeeId,
        date: attendanceDate,
        newStatus
      });
    }

    await attendance.save();
    res.json(attendance);
  } catch (err) {
    console.error('Add/update attendance error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
