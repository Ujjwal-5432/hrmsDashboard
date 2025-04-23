import React, { useEffect, useRef, useState } from "react";
import "./Employees.css";
import Sidebar from "../Candidates/Sidebar";
import msg from '../../Assets/MailIcon.png'
import notification from '../../Assets/notifications.png'
import downIcon from "../../Assets/DownIcon.png"
import ellipse from "../../Assets/ellipse.png"
import threeDots from "../../Assets/threeDotsIcon.png"
import ThreeDotMenu from "./ThreeDotMenu";
import EditEmployee from "./EditEmployee";
import axios from "axios";

const Employees=()=>{
  const[sidebarOpen , setSidebarOpen]=useState(false);
  const[isOpen,setIsOpen] = useState(null);

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

    const handleDelete = async (id) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this candidate?");
      if (!confirmDelete) return;
    
      try {
        const token = localStorage.getItem("token");
    
        await axios.delete(`http://localhost:8000/api/employees/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        alert("Candidate deleted successfully");
        window.location.reload();
      } catch (err) {
        console.error("Delete error:", err.message);
        alert("Failed to delete candidate");
      }
    };

    const [searchTerm, setSearchTerm] = useState("");
    
    const filteredEmployees = employees.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.position.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (isoString) => {
      const date = isoString ? new Date(isoString) : new Date();
      return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    };
    
  return (
    <div className="dashboard">
      <Sidebar/>
      <div className="main">
        
        <div className="header">
          <h2>Employees</h2>
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
              <option>Position</option>
            </select>
          </div>

          <div className="header-actions">
            <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          </div>

        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Employee Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Position</th>
                <th>Department</th>
                <th>Date of Joining</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((c, i) => (
                <tr key={c.id}>
                  <td><img src={ellipse}/></td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.position}</td>
                  <td>{c.department}</td>
                  <td>{formatDate(c.dateOfJoining)}</td>
                  <td style={{position: "relative"}}>
                    <img
                      src={threeDots}
                      onClick={() => setIsOpen(isOpen === null ? c._id : null)}
                      className="cursor-pointer"
                    />
                    {isOpen === c._id && (
                      <div className="dropdown">
                        <div className="dropdown-item" onClick={()=> {setShow(!show); setIsOpen(null)}}>Edit</div>
                        <div className="dropdown-item" onClick={()=> {handleDelete(c._id)}}>Delete</div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {
          show && (
            <EditEmployee show={show} setShow={setShow} modalRef={modalRef}/>
          )
        }
      </div>
    </div>
  );
}

export default Employees;
