import React from "react";
import { FaHeart, FaClipboardList, FaMapMarkerAlt, FaHistory, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ setActiveSection }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <div className="profile-sidebar">
      <h3
        className="sidebar-title clickable"
        onClick={() => setActiveSection("overview")}
      >
        <FaUserCircle className="menu-icon" />
        My Jumia Account
      </h3>

      <ul className="sidebar-menu">
        <li onClick={() => setActiveSection("orders")}>
          <FaClipboardList className="menu-icon" />
          Orders
        </li>
        <li onClick={() => setActiveSection("addresses")}>
          <FaMapMarkerAlt className="menu-icon" />
          Addresses
        </li>
        <li onClick={() => setActiveSection("recently-viewed")}>
          <FaHistory className="menu-icon" />
          Recently Viewed Items
        </li>
        <li onClick={() => setActiveSection("favorites")}>
          <FaHeart className="menu-icon" />
          My Favourite Products
        </li>
        <li onClick={handleLogout} className="logout-item">
          <FaSignOutAlt className="menu-icon" />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
