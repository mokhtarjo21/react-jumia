import React, { useState } from "react";
import {
  FaHeart,
  FaClipboardList,
  FaMapMarkerAlt,
  FaHistory,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = ({ setActiveSection }) => {
  const [activeItem, setActiveItem] = useState("overview");
  const navigate = useNavigate();

  const handleClick = (section) => {
    setActiveSection(section);
    setActiveItem(section);
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <div className={styles.profileSidebar}>
      <h3
        className={`${styles.sidebarTitle} ${styles.clickable}`}
        onClick={() => handleClick("overview")}
      >
        <FaUserCircle className={styles.menuIcon} />
        My Jumia Account
      </h3>

      <ul className={styles.sidebarMenu}>
        <li
          className={activeItem === "orders" ? styles.active : ""}
          onClick={() => handleClick("orders")}
        >
          <FaClipboardList className={styles.menuIcon} />
          Orders
        </li>
        <li
          className={activeItem === "addresses" ? styles.active : ""}
          onClick={() => handleClick("addresses")}
        >
          <FaMapMarkerAlt className={styles.menuIcon} />
          Addresses
        </li>
        <li
          className={activeItem === "recently-viewed" ? styles.active : ""}
          onClick={() => handleClick("recently-viewed")}
        >
          <FaHistory className={styles.menuIcon} />
          Recently Viewed Items
        </li>
        <li
          className={activeItem === "favorites" ? styles.active : ""}
          onClick={() => handleClick("favorites")}
        >
          <FaHeart className={styles.menuIcon} />
          My Favourite Products
        </li>
        <li className={styles.logoutItem} onClick={handleLogout}>
          <FaSignOutAlt className={styles.menuIcon} />
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;