import React, { useState } from "react";
import "./RegistrationPage.css";
import closeEye from '../../Assets/closeEyeIcon.png'
import openEye from '../../Assets/openEyeIcon.png'
import { register } from "../../api/auth";
import {useNavigate} from "react-router-dom";

const RegistrationPage = () => {
  const[showPassword , setShowPassword] = useState(false);
  const[showConfirmPassword , setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmpassword: '', role: 'Admin' });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(form);
      const res = await register(form);
      console.log('User registered:', res.data);
      alert("You have registered successfully!!! Now you need to login!!!");
      navigate('/login')
      // localStorage.setItem('token', res.data.token);
    } catch (err) {
      const msg = err.response.data.message;
      if(msg == "User already exists"){
        alert("User already exists!!!");
      }
      if(msg === "Passwords do not match"){
        alert("Password & Confirm Password is not matching!!!");
      }
      
      console.error(err.response.data);
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <img
          src="https://i.ibb.co/6s7zVbJ/dashboard.png"
          alt="Dashboard Preview"
          className="dashboard-img"
        />
        <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</h2>
        <p>
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
        <div className="dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>

      <div className="right-section">
        <div className="form-box">
          <h2>Welcome to Dashboard</h2>

          <form onSubmit={handleSubmit}>
            <label>Full name*</label>
            <input type="text" placeholder="Full name" onChange={(e) => setForm({ ...form, name: e.target.value })}/>

            <label>Email Address*</label>
            <input type="email" placeholder="Email Address" onChange={(e) => setForm({ ...form, email: e.target.value })}/>

            <label>Password*</label>
            <div className="password-input">
              <input type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })}/>
              <span className="eye-icon" onClick={()=> setShowPassword(!showPassword)}>
                <img src={showPassword ? closeEye : openEye}/>
              </span>
            </div>

            <label>Confirm Password*</label>
            <div className="password-input">
              <input type="password" placeholder="Confirm Password" onChange={(e) => setForm({ ...form, confirmpassword: e.target.value })} />
              <span className="eye-icon" onClick={()=> setShowConfirmPassword(!showConfirmPassword)}>
                <img src={showConfirmPassword ? closeEye : openEye}/>
              </span>
            </div>

            <button type="submit" className="reg-btn">Register</button>
          </form>

          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;