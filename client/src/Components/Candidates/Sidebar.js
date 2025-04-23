import React, { useEffect, useRef, useState } from "react";
import "./CandidatesDashboardStyles.css";
import contact from "../../Assets/contact.png"
import attendance from "../../Assets/leaves.png"
import employees from "../../Assets/employees.png"
import logout from "../../Assets/logout.png"
import leaves from "../../Assets/leaves.png"
import AddNewCandidate from "./AddNewCandidate";
import Logout from "../Logout/Logout";
import { Link } from "react-router-dom";

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
            <Link className="nav-item" to='/candidates'>
              <img src={contact}/>
              <span>Candidates</span>
            </Link>

            <h4 className="section">Organization</h4>

            <Link className="nav-item" to='/employees'>
                <img src={employees}/>
                <span>Employees</span>
            </Link>

            <Link className="nav-item" to='/attendance'>
                <img src={attendance}/>
                <span>Attendance</span>
            </Link>

            <Link className="nav-item" to='/leaves'>
                <img src={leaves}/>
                <span>Leaves</span>
            </Link>

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