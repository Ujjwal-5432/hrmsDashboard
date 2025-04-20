import React, { useState } from "react";
import "./EditEmployee.css"
import doj from '../../Assets/doj.png'
import down from '../../Assets/DownIcon.png'

const EditEmployee=({show,setShow,modalRef})=>{
  const[openDropdown,setOpenDropdown]=useState(false);

    return(
        <div className="popup-overlay">
        <div className="popup-container" ref={modalRef}>

            <div className="popup-headeremployee">
              <h4>Edit Employee Details</h4>
              <button className="close-btn" onClick={() => setShow(false)}>×</button>
            </div>

          <form className="popup-form">
            <div className="form-row">
              <input type="text" placeholder="Full Name*" required />
              <input type="email" placeholder="Email Address*" required />
            </div>

            <div className="form-row">
              <input type="tel" placeholder="Phone Number*" required />
              <input type="text" placeholder="Department*" required />
            </div>

            <div className="form-row-calender">
                <div className="input-with-icon">
                  <input
                    type="text"
                    placeholder="Position*"
                    onClick={() => setOpenDropdown(!openDropdown)}
                    required
                  />
                  <img src={down}></img>
                </div>
                {
                  openDropdown && (
                    <div className="dropDownPos">
                      <div className="dropdown-item-pos">Inter</div>
                      <div className="dropdown-item-pos">Full-time</div>
                      <div className="dropdown-item-pos">Junior</div>
                      <div className="dropdown-item-pos">Senior</div>
                      <div className="dropdown-item-pos">Team Lead</div>
                    </div>
                  )
                }

                <div className="input-with-icon" style={{cursor: "pointer"}}>
                  <input type="date" placeholder="Date of Joining*" required />
                  {/* <img src={doj} alt="calendar icon" /> */}
                </div>
            </div>

            <button type="submit" className="submit-btn">
              Save
            </button>
          </form>

        </div>
        </div>
    )
}

export default EditEmployee;