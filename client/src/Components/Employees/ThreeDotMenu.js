import React, { useRef, useEffect } from "react";
import "./ThreeDotsMenu.css";
import threeDots from "../../Assets/threeDotsIcon.png";

const ThreeDotMenu = ({ isOpen, onToggle, onEdit, onDelete }) => {
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onToggle(null); // Close menu if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onToggle]);

  return (
    <div className="menu-wrapper" ref={menuRef}>
      <img
        src={threeDots}
        alt="menu"
        onClick={() => onToggle(isOpen ? null : true)}
        className="menu-icon"
      />
      {isOpen && (
        <div className="dropdown">
          <div className="dropdown-item" onClick={onEdit}>Edit</div>
          <div className="dropdown-item" onClick={onDelete}>Delete</div>
        </div>
      )}
    </div>
  );
};

export default ThreeDotMenu;
