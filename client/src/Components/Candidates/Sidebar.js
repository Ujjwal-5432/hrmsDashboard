import React, { useEffect, useRef, useState } from "react";
import "./CandidatesDashboardStyles.css";
import contact from "../../Assets/contact.png"
import attendance from "../../Assets/leaves.png"
import employees from "../../Assets/employees.png"
import logout from "../../Assets/logout.png"
import leaves from "../../Assets/leaves.png"
import AddNewCandidate from "./AddNewCandidate";
import Logout from "../Logout/Logout";

const Sidebar = ()=>{
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

    return(
        <div className="sidebar">
            <div className="logo">LOGO</div>
            <input className="sidebar-search" type="text" placeholder="Search" />
        
            <h4 className="section">Recruitment</h4>
            <div className="nav-item">
              <img src={contact}/>
              <span>Candidates</span>
            </div>

            <h4 className="section">Organization</h4>

            <div className="nav-item">
                <img src={employees}/>
                <span>Employees</span>
            </div>

            <div className="nav-item">
            <img src={attendance}/>
            <span>Attendance</span>
            </div>

            <div className="nav-item">
            <img src={leaves}/>
            <span>Leaves</span>
            </div>

            <h4 className="section">Others</h4>

            <div className="nav-item" onClick={()=> setShow(!show)}>
                <img src={logout}/>
                <span>Logout</span>
            </div>
            {
                show && (
                    <Logout show={show} setShow={setShow} modalRef={modalRef} />
                )
            }
        </div>
    )
}

export default Sidebar;