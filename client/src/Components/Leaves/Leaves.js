import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Candidates/Sidebar";
import msg from '../../Assets/MailIcon.png'
import notification from '../../Assets/notifications.png'
import downIcon from "../../Assets/DownIcon.png"
import ellipse from "../../Assets/ellipse.png"
import "./Leaves.css"
import "./LeavesCalender.css"
import AddLeave from "./AddLeave";

const leaves = [
  {
    id: 1,
    name: "Jacob William",
    date: "8/09/2024",
    reason:"Visiting House",
    status: "Approved",
    docs: "file"
  }
];

const Leaves=()=>{
  const[show,setShow]=useState(false);
  const modalRef = useRef();

  useEffect(() => {
      const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          setShow(false);
        }
      };
    
      if (show) {
        document.addEventListener("mousedown", handleClickOutside);
        console.log("mousePressed");
      }
    
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [show]);

  return (
    <div className="dashboard">
      <Sidebar/>
      <div className="main">
        
        <div className="header">
          <h2>Leaves</h2>
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
              <option>Status</option>
            </select>
          </div>

          <div className="header-actions">
            <input type="text" placeholder="Search" />
            <button className="add-candidate" onClick={()=> setShow(!show)}>Add Leave</button>
          </div>

          {
            show && (
              <AddLeave show={show} setShow={setShow} modalRef={modalRef}/>
            )
          }

        </div>

        <div className="merge">
          <div className="table-wrapper-leaves">
            <table>
              <thead>
              <tr>
                <th colspan="6" className="applied">Applied Leaves</th>
              </tr>
                <tr>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Docs</th>
                </tr>
              </thead>
              <tbody>
              {leaves.map((l, i) => (
                  <tr key={l.id}>
                    <td>{`0${i + 1}`}</td>
                    <td>{l.name}</td>
                    <td>{l.date}</td>
                    <td>{l.reason}</td>
                    <td>
                      <button className={`status ${l.status}`}>
                        {l.status.charAt(0).toUpperCase() + l.status.slice(1)}
                      </button>
                    </td>
                    <td>{l.docs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="leave-calendar-container">
          <div className="leave-calendar-header">Leave Calendar</div>

          <div className="calendar-box">
            <div className="calendar-header">
              <span className="arrow">{'<'}</span>
              <span className="month">September, 2024</span>
              <span className="arrow">{'>'}</span>
            </div>

            <div className="calendar-grid">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                <div key={day} className="day-name">{day}</div>
              ))}

              {/* Example: Fill with sample days */}
              {Array.from({ length: 30 }).map((_, i) => {
                const day = i + 1;
                return (
                  <div
                    key={day}
                    className={`day ${day === 8 ? 'highlighted' : ''}`}
                  >
                    {day}
                    {day === 8 && <div className="dot">1</div>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="approved-leaves">
            <h4>Approved Leaves</h4>
            <div className="leave-card">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Cody Fisher"
                className="profile-pic"
              />
              <div className="leave-details">
                <div className="name">Cody Fisher</div>
                <div className="role">Senior Backend Developer</div>
              </div>
              <div className="leave-date">8/09/24</div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Leaves;