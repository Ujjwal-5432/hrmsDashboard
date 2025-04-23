import React, { useEffect, useRef, useState } from "react";
import "./CandidatesDashboardStyles.css";
import Sidebar from "./Sidebar";
import msg from '../../Assets/MailIcon.png'
import notification from '../../Assets/notifications.png'
import downIcon from "../../Assets/DownIcon.png"
import ellipse from "../../Assets/ellipse.png"
import threeDots from "../../Assets/threeDotsIcon.png"
import AddNewCandidate from "./AddNewCandidate";
import axios from "axios";
import StatusDropdown from "./StatusDropDown";


const CandidatesDashboard=()=>{
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

  const[isOpen,setIsOpen] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem('token'); 

      const res = await axios.get('http://localhost:8000/api/candidates', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCandidates(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching candidates:', err.response?.data || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleDownload = async (candidate) => {
    try {
      const token = localStorage.getItem('token'); // or however you're storing it

      const res = await axios.get(`http://localhost:8000/api/candidates/${candidate._id}/resume`, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.headers['content-type'].includes('application/json')) {
        const text = await res.data.text();
        const json = JSON.parse(text);
        throw new Error(json.message || 'Unknown error');
      }

      const blob = new Blob([res.data], { type: res.data.type });
      const url = window.URL.createObjectURL(blob);

      const cd = res.headers['content-disposition'];
      const filename = cd
        ? cd.split('filename=')[1].replace(/"/g, '')
        : `${candidate.name}_resume.pdf`;

      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download error:', err.message);
      alert(`Failed to download resume: ${err.message}`);
    }
  };  

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this candidate?");
    if (!confirmDelete) return;
  
    try {
      const token = localStorage.getItem("token");
  
      await axios.delete(`http://localhost:8000/api/candidates/${id}`, {
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

  const updateCandidateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/api/candidates/${id}/status`, {
        status: newStatus,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setCandidates(prev =>
        prev.map(c =>
          c._id === id ? { ...c, status: newStatus } : c
        )
      );
    } catch (err) {
      console.error("Status update failed:", err.message);
      alert("Failed to update status");
    }
  };
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const statuses = ['New', 'Scheduled', 'Ongoing', 'Selected', 'Rejected'];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCandidates = candidates.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <Sidebar/>
      <div className="main">
        
        <div className="header">
          <h2>Candidates</h2>
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
              <option>New</option>  
              <option>Scheduled</option>
              <option>Ongoing</option>
              <option>Rejected</option>
              <option>Selected</option>
            </select>
            <select>
              <option>Position</option>
              <option>Intern</option>
              <option>Full-time</option>
              <option>Junior</option>
              <option>Senior</option>
            </select>
          </div>

          <div className="header-actions">
            <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <button className="add-candidate" onClick={()=>setShow(!show)}>Add Candidate</button>
          </div>

          {
              show && (
                  <AddNewCandidate show={show} setShow={setShow} modalRef={modalRef}/>
              )
          }
          

        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Candidates Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Position</th>
                <th>Status</th>
                <th>Experience</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((c, i) => (
                <tr key={c._id}>
                  <td>{`0${i + 1}`}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.position}</td>

                  <td>
                    <StatusDropdown
                      currentStatus={c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                      onChange={(newStatus) => {
                        updateCandidateStatus(c._id, newStatus);
                      }}
                    />
                  </td>

                  <td>{c.experience}</td>

                  <td style={{ position: "relative" }}>
                    <img
                      src={threeDots}
                      onClick={() => setIsOpen(isOpen === null ? i : null)}
                      className="cursor-pointer"
                    />
                    {isOpen === i && (
                      <div className="dropdown">
                        <div className="dropdown-item" onClick={() => handleDownload(c)}>Download Resume</div>
                        <div className="dropdown-item" onClick={() => handleDelete(c._id)}>Delete Candidate</div>
                      </div>
                    )}
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

export default CandidatesDashboard;
