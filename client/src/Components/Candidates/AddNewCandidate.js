import React, { useState } from "react";
import "./AddNewCandidate.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const AddNewCandidate=({show,setShow,modalRef})=>{
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      resume: null
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
      if (e.target.name === 'resume') {
        setFormData({ ...formData, resume: e.target.files[0] });
      } else {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        data.append('position',formData.position);
        data.append('experience', formData.experience);
        data.append('resume', formData.resume);
  
        const token = localStorage.getItem('token');
    
        const res = await axios.post('http://localhost:8000/api/candidates', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        });
    
        console.log('Candidate created:', res.data);
        navigate('/candidates');
        setShow(false);
        alert('Candidate created successfully!');
      } catch (err) {
        console.error('Error creating candidate:', err.response?.data || err.message);
        alert('Error submitting form');
      }
    };    

    return(
        <div className="popup-overlay">
        <div className="popup-container" ref={modalRef}>
            <div className="popup-header">
              <h4>Add New Candidate</h4>
              <button className="close-btn" onClick={() => setShow(false)}>×</button>
            </div>

          <form className="popup-form" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-row">
              <input type="text" placeholder="Full Name*" name= "name" required onChange={handleChange}/>
              <input type="email" placeholder="Email Address*" name= "email" required onChange={handleChange} />
            </div>

            <div className="form-row">
              <input type="tel" placeholder="Phone Number*" name="phone" required onChange={handleChange}/>
              <input type="text" placeholder="Position*" name="position" required onChange={handleChange} />
            </div>

            <div className="form-row">
              <input type="text" placeholder="Experience*" name="experience" required/>
              <div className="resume-upload">
                <input type="file" id="resume" name="resume" hidden onChange={handleChange} accept=".pdf , .doc , .docx"/>
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