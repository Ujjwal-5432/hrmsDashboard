import React from 'react';
import "./Logout.css"
import { useNavigate } from 'react-router-dom';

const Logout= ({show,setShow,modalRef}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.clear(); 
    navigate('/');
  };

  return (
    <div className="popup-overlay-logout">
    <div className="popup-box-logout">
      <div className="popup-header-logout">Log Out</div>
      <div className="popup-content-logout">
        <p>Are you sure you want to log out?</p>
        <div className="popup-buttons-logout">
          <button className="cancel-btn-logout" onClick={()=> setShow(false)}>Cancel</button>
          <button className="logout-btn" onClick={handleLogout} >Logout</button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Logout;
