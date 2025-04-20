import React from "react";
import "./AddLeave.css"
import search from "../../Assets/search.png"
import upload from "../../Assets/upload.png"

const AddLeave=({show,setShow,modalRef})=>{
    return(
        <div className="popup-overlay">
        <div className="popup-container" ref={modalRef}>
            <div className="popup-header">
              <h4>Add New Leave</h4>
              <button className="close-btn" onClick={() => setShow(false)}>×</button>
            </div>
          <form className="popup-form">
            <div className="form-row">
              <div className="input-with-icon-search">
                <img src={search}/>
                <input type="text" placeholder="Search Employee Name" required />
              </div>
              <input type="email" placeholder="Desination*" required />
            </div>

            <div className="form-row">
              <input type="date" placeholder="Leave Dater*" required />
              <div className="doc-upload">
                <div>
                    <input type="file" id="resume"hidden />
                    <label htmlFor="resume">Documents*</label>
                </div>
                <img src={upload}/>
              </div>
            </div>

            <div className="form-row">
              <input type="text" placeholder="Reason*" required />
            </div>

            <button type="submit" className="submit-btn">
              Save
            </button>
          </form>
        </div>
        </div>
    )
}

export default AddLeave;