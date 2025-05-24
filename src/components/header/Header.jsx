import React, { useEffect } from 'react';
import { IoHelpCircleOutline } from "react-icons/io5";
import { GrCart } from "react-icons/gr";
import { FaBars } from 'react-icons/fa';
import { useNavigate, useLocation } from "react-router-dom";
import styles from './header.module.css';
import jumiaLogo from '../../assets/jumia_header_logo.png';
import { Link } from 'react-router-dom';
import SearchBar from './header_search_component/search';
import UserDroplist from './UserDroplist/UserDroplist';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../store/userSlice';
import { fetchCart, selectCartItemCount } from '../../store/cartSlice';

function JumiaNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);
  
  // Get cart count from Redux store
  const cartCount = useSelector(selectCartItemCount);
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    // Check if we have a token first
    const access = localStorage.getItem('access');
    
    if (access) {
      // Fetch user data and store it in Redux
      dispatch(fetchUserData())
        .catch((error) => {
          console.error('Error fetching user info:', error);
          // If we get an authentication error, clear the tokens
          if (error === 'No access token found' || error?.includes('auth')) {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
          }
        });
    }
  }, [dispatch]);
  
  // Always fetch cart data (will get from cookies if not logged in)
  useEffect(() => {
    dispatch(fetchCart()).catch(error => {
      console.error('Error fetching cart:', error);
    });
  }, [dispatch]);
  
  // Refetch cart when login status changes
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchCart()).catch(error => {
        console.error('Error fetching cart after login:', error);
      });
    }
  }, [isLoggedIn, dispatch]);

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
            <UserDroplist />
            {/* Help */}
            <div className={styles.header__help}>
              <IoHelpCircleOutline size={28} className={styles.header__icon} />
              <span className={styles.header__helpText}>Help</span>
            </div>
            {/* Cart */}
            <div onClick={() => navigate('/cart')} className={styles.header__cart}>
              <GrCart size={20} className={styles.header__icon} />
              <span className={styles.header__cartText}>Cart</span>
              {cartCount > 0 && <span className={styles.header__cartBadge}>{cartCount}</span>}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default JumiaNavbar;