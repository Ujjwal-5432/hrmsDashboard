import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Candidates/Sidebar";
import msg from '../../Assets/MailIcon.png'
import notification from '../../Assets/notifications.png'
import downIcon from "../../Assets/DownIcon.png"
import ellipse from "../../Assets/ellipse.png"
import threeDots from "../../Assets/threeDotsIcon.png"

const candidates = [
  {
    id: 1,
    name: "Jacob William",
    email: "jacob.william@example.com",
    phone: "(252) 555-0111",
    position: "Senior Developer",
    status: "new",
    experience: "1+"
  },
  {
    id: 2,
    name: "Guy Hawkins",
    email: "kenzi.lawson@example.com",
    phone: "(907) 555-0101",
    position: "Human Resource Intern",
    status: "new",
    experience: "0"
  },
  {
    id: 3,
    name: "Arlene McCoy",
    email: "arlene.mccoy@example.com",
    phone: "(302) 555-0107",
    position: "Full Time Designer",
    status: "selected",
    experience: "2"
  },
  {
    id: 4,
    name: "Leslie Alexander",
    email: "willie.jennings@example.com",
    phone: "(207) 555-0119",
    position: "Full Time Developer",
    status: "rejected",
    experience: "0"
  }
];

const Attendance=()=>{
    const [openIndex, setOpenIndex] = useState(null);
    // console.log(isOpen);

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
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((c, i) => (
                <tr key={c.id}>
                  <td><img src={ellipse}/></td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.position}</td>
                  <td onClick={() => setOpenIndex(c.id === openIndex ? null : c.id)}>

                    <button className={`status ${c.status}`}>
                      {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                      <img src={downIcon} style={{width: '16px'}}/>
                    </button>

                    {
                        openIndex===c.id && (
                            <div className="dropDownPos">
                                <div className="dropdown-item-pos">Inter</div>
                                <div className="dropdown-item-pos">Full-time</div>
                                <div className="dropdown-item-pos">Junior</div>
                                <div className="dropdown-item-pos">Senior</div>
                                <div className="dropdown-item-pos">Team Lead</div>
                            </div>
                        )
                    }

                  </td>

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
