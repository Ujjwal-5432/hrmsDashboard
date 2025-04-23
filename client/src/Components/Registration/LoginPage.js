import React, { useState } from "react";
import "./RegistrationPage.css"
import closeEye from '../../Assets/closeEyeIcon.png'
import openEye from '../../Assets/openEyeIcon.png'
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";

const LoginPage = () => {
  const[showPassword , setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: ''});
  const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        console.log(form);
        const res = await login(form);
        console.log('User registered:', res.data);
        alert("You have logined successfully!!!");

        navigate('/candidates')
        localStorage.setItem('token', res.data.token);
      } catch (err) {
        const msg = err.response.data.message;

        if (!form.email.trim() || !form.password.trim()) {
          alert("Kindly fill all the required details!!!")
        }
        if(msg == "Invalid credentials"){
          alert("User Not Found!!!");
        }
        if(msg === "Password is not match"){
          alert("Password is not matching!!!");
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
            <label>Email Address*</label>
            <input type="email" placeholder="Email Address" onChange={(e) => setForm({ ...form, email: e.target.value })}/>

            <label>Password*</label>
            <div className="password-input">
              <input type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })}/>
              <span className="eye-icon" onClick={()=> setShowPassword(!showPassword)}>
                <img src={showPassword ? closeEye : openEye}/>
              </span>
            </div>
            <p>Forgot Password ?</p>
            <button type="submit">Login</button>
          </form>

          <p className="login-link">
            Don’t have an account? <a href="/">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;