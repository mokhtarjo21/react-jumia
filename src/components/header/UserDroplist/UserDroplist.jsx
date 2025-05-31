import React, { useState, useRef, useEffect } from "react";
import styles from "./userDroplist.module.css";
import { FaRegUser } from "react-icons/fa";
import { instance } from "../../../axiosInstance/instance";
// import { deletecart } from "../../../utils/cartCookie";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUserData, fetchUserData } from "../../../store/userSlice";
import { clearCart } from "../../../store/cartSlice";

const UserDroplist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, isLoggedIn, loading, error } = useSelector((state) => state.user);

  const dropdownRef = useRef(null);
  
  // Toggle dropdown
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  
  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    
    // Add event listener when dropdown is shown
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const sublogout = async () => {
    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");
    try {
      const responsee = await instance.post(
        "/users/api/logout",
        { refresh },
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );
      
      // Always clear local data regardless of response
    //   deletecart();
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      
      // Clear user data and cart from Redux store
      dispatch(clearUserData());
      dispatch(clearCart());
      
      if (responsee.status === 200) {
        navigate("/");
      } else {
        console.error("Logout failed");
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      // Still clear local data and Redux store on error
    //   deletecart();
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      dispatch(clearUserData());
      dispatch(clearCart());
      navigate("/login");
    }
  };
  
  // Get username - check all possible properties
  const getUserName = () => {
    if (!user) return null;
    return user.first_name || user.username;
  };  
  
  // Determine what text to display
  let displayText = "Login";
  if (loading) {
    displayText = "Loading...";
  } else if (isLoggedIn && user) {
    const userName = getUserName();
    displayText = `Hi, ${userName}`;
  }
  
  return (
    <div className={styles.header__account} ref={dropdownRef}>
      <div onClick={toggleDropdown} className={showDropdown ? styles.active : ''}>
        <FaRegUser size={20} className={styles.header__icon} />
        <span className={styles.header__accountText}>
          {displayText}
        </span>
      </div>
      
      {showDropdown && (
        <div className={styles.header__dropdown}>
          {isLoggedIn ? (
            <>
              <span
                className={styles.dropdownItem}
                onClick={() => navigate("/profile")}
              >
                Profile
              </span>
              <span 
                className={styles.dropdownItem} 
                onClick={() => navigate("/profile")}
              >
                Orders
              </span>
              <span 
                className={`${styles.logoutButton}`}
                onClick={sublogout}
              >
                Logout
              </span>
            </>
          ) : (
            <>
            <span 
              className={`${styles.loginButton}`}
              onClick={() => navigate("/login")}
              >
              Login
            </span>
            <span
            className={styles.dropdownItem}
            onClick={() => navigate("/user/wishlist")}
            >
            Wish List
          </span>
              </>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDroplist;
