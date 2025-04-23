import React, { useState, useRef, useEffect } from 'react';
import './AttendanceDropDown.css';

const AttendanceDropdown = ({ currentStatus, onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const statuses = ['Present','Absent'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  console.log(currentStatus)

  return (
    <div className="status-dropdown" ref={dropdownRef}>
      <button className="status-btn" onClick={() => setOpen(!open)}>
        {currentStatus}
        <span className="arrow">&#9662;</span>
      </button>

      {open && (
        <div className="status-menu">
          {statuses.map((status) => (
            <div
              key={status}
              className={`status-option`}
              onClick={() => {
                onChange(status.toLowerCase());
                setOpen(false);
              }}
            >
              {status}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendanceDropdown;
