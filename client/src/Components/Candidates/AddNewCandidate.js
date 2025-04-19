import React from "react";
import "./AddNewCandidate.css"

const AddNewCandidate=({show,setShow,modalRef})=>{
    return(
        <div className="popup-overlay">
        <div className="popup-container" ref={modalRef}>
            <div className="popup-header">
              <h4>Add New Candidate</h4>
              <button className="close-btn" onClick={() => setShow(false)}>×</button>
            </div>
          <form className="popup-form">
            <div className="form-row">
              <input type="text" placeholder="Full Name*" required />
              <input type="email" placeholder="Email Address*" required />
            </div>

            <div className="form-row">
              <input type="tel" placeholder="Phone Number*" required />
              <input type="text" placeholder="Position*" required />
            </div>

            <div className="form-row">
              <input type="text" placeholder="Experience*" required />
              <div className="resume-upload">
                <input type="file" id="resume" hidden />
                <label htmlFor="resume">Resume*</label>
              </div>
            </div>

            <div className="declaration">
              <input type="checkbox" id="declaration" />
              <label htmlFor="declaration">
                I hereby declare that the above information is true to the best of my knowledge and belief
              </label>
            </div>

            <button type="submit" className="submit-btn">
              Save
            </button>
          </form>
        </div>
        </div>
    )
}

export default AddNewCandidate;