import React, { useEffect, useState } from 'react';
import { instance } from "../../axiosInstance/instance";
import { FaUser, FaQuestionCircle, FaShoppingCart, FaBars,  } from 'react-icons/fa';
import { useNavigate, useLocation } from "react-router-dom";
import { fetchCartFromBackend, deletecart } from '../../utils/cartCookie';
import styles from './header.module.css';
import jumiaLogo from '../../assets/jumia_header_logo.png';
import { Link } from 'react-router-dom';
import SearchBar from './header_search_component/search';

export default function JumiaNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userinfo, setUserinfo] = useState();
  const [showuserinfo, setShowUserInfo] = useState(false);
  const [cartCount, setCartCount] = useState(3); // Placeholder for cart badge

  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const userinfo = async () => {
      try {
        const access = localStorage.getItem('access');
        const response = await instance.get('/users/api/who', {
          headers: {
            'Authorization': `Bearer ${access}`,
          }
        });
        if (response.status === 200) {
          const data = response.data.response;
          fetchCartFromBackend();
          setUserinfo(data);
          setShowUserInfo(true);
        } else {
          console.error('Failed to fetch user info');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }
    userinfo();
  }, []);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const sublogout = async () => {
    const access = localStorage.getItem('access');
    const refresh = localStorage.getItem('refresh');
    try {
      const responsee = await instance.post('/users/api/logout', { refresh }, {
        headers: {
          Authorization: `Bearer ${access}`
        }
      });
      if (responsee.status === 200) {
        deletecart();
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error.response?.data || error.message);
    }
  }
  return (
    <header className={styles.header}>
      <div className="container-fluid p-0">
        <div className={styles.header__container}>
          {/* Left Section: Hamburger + Logo */}
          <div className={styles.header__left}>
            {!isHomePage && <button className={styles.header__menuBtn} aria-label="Open menu">
              <FaBars size={24} />
            </button>}
            <Link to="/"><img src={jumiaLogo} alt="Jumia" className={styles.header__logo} /></Link>
          </div>
          {/* Center Section: Search */}
          <SearchBar />
          {/* Right Section: Account, Help, Cart */}
          <div className={styles.header__right}>
            {/* Account */}
            <div className={styles.header__account}>
              <FaUser size={20} className={styles.header__icon} onClick={toggleDropdown} />
              <span className={styles.header__accountText} onClick={toggleDropdown}>
                {showuserinfo ? `Hi, ${userinfo.first_name}` : 'Hi, عمرو'}
              </span>
              {showDropdown && (
                showuserinfo ? (
                  <div className={styles.header__dropdown + " dropdown-menu show position-absolute end-0 mt-2"}>
                    <span className="dropdown-item" onClick={() => navigate('/profile')}>Profile</span>
                    <span className="dropdown-item" onClick={() => navigate('/order')}>Orders</span>
                    <span className="dropdown-item" onClick={sublogout}>Logout</span>
                  </div>
                ) : (
                  <div className={styles.header__dropdown + " dropdown-menu show position-absolute end-0 mt-2"}>
                    <span className="dropdown-item" onClick={() => navigate('/login')}>Login</span>
                  </div>
                )
              )}
            </div>
            {/* Help */}
            <div className={styles.header__help}>
              <FaQuestionCircle size={18} className={styles.header__icon} />
              <span className={styles.header__helpText}>Help</span>
            </div>
            {/* Cart */}
            <div onClick={() => navigate('/cart')} className={styles.header__cart}>
              <FaShoppingCart size={20} className={styles.header__icon} />
              <span className={styles.header__cartText}>Cart</span>
              <span className={styles.header__cartBadge}>{cartCount}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
