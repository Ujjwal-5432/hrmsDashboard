import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Candidates/Sidebar";
import msg from '../../Assets/MailIcon.png'
import notification from '../../Assets/notifications.png'
import downIcon from "../../Assets/DownIcon.png"
import ellipse from "../../Assets/ellipse.png"
import threeDots from "../../Assets/threeDotsIcon.png"
import AttendanceDropDown from "./AttendanceDropDown"
import axios from "axios";


const Attendance=()=>{
    const [openIndex, setOpenIndex] = useState(null);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
      const fetchEmployees = async () => {
        try {
          const token = localStorage.getItem('token'); 
    
          const res = await axios.get('http://localhost:8000/api/employees', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
    
          setEmployees(res.data);
        } catch (err) {
          console.error('Error fetching employees:', err.response?.data || err.message);
        }
      };

      fetchEmployees();
    }, []);

    const handleAttendanceChange = async (employeeId, newStatus, date) => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await fetch("http://localhost:8000/api/attendance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
          body: JSON.stringify({
            employeeId,
            attendance: newStatus,
            date: date || new Date(), 
          }),
        });
    
        const data = await response.json();
        if (response.ok) {
          console.log("Attendance updated:", data);
        } else {
          console.error("Failed to update attendance:", data.message);
        }
      } catch (err) {
        console.error("API Error:", err);
      }
    };
    

  return (
    <div className="dashboard">
      <Sidebar/>
      <div className="main">
        
        <div className="header">
          <h2>Attendance</h2>
          <div>
            <img src={msg}/>
            <img src={notification}/>
            <img src={ellipse}/>
            <img src={downIcon}/>
          </div>
        </div>

        <div className="filters">
          <div>
            <select>
              <option>Status <img src={downIcon}/></option>
            </select>
          </div>

          <div className="header-actions">
            <input type="text" placeholder="Search" />
          </div>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Profile</th>
                <th>Employee Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Task</th>
                <th>Attendance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((c, i) => (
                <tr key={c.id}>
                  <td><img src={ellipse}/></td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.position}</td>
                  {/* <td onClick={() => setOpenIndex(c.id === openIndex ? null : c._id)}> */}

                  <td>
                    <AttendanceDropDown
                      currentStatus={c.attendance}
                      onChange={(newStatus) => {
                        handleAttendanceChange(c._id, newStatus,c.dateOfJoining);
                      }}
                    />
                  </td>

                  {/* </td> */}

                  <td style={{position: "relative"}}>
                    <img
                      src={threeDots}
                      className="cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Attendance;