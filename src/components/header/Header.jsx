import React, { useEffect, useState } from 'react';
import { instance } from "../../axiosInstance/instance";
import { Dropdown } from 'react-bootstrap';
import { FaUser, FaQuestionCircle, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
export default function JumiaNavbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userinfo, setUserinfo] = useState()
  const [showuserinfo, setShowUserInfo] = useState(false);
  useEffect(() => {
    const userinfo = async () => {
      try {
        const access =localStorage.getItem('access')
        const response = await instance.get('/users/api/who', {
          headers: {
            'Authorization': `Bearer ${access}`,
             
          }
        });
        if (response.status === 200) {
          const data = response.data.response;
          console.log('User info fetched successfully:', data);
          setUserinfo(data,);
          setShowUserInfo(true);
          console.log('User info:', userinfo);
          // You can set user info in state or context here
        } else {
          console.error('Failed to fetch user info');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }
    userinfo();
  }
  , []);
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  
    const sublogout = async () => {
      const access =localStorage.getItem('access')
       const refresh = localStorage.getItem('refresh');
         try {
  const responsee=  await instance.post('/users/api/logout', { refresh }, {
      headers: {
        Authorization: `Bearer ${access}`
      }
    });

    if (responsee.status === 200) {
      console.log('Logout successful');
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
    <div className="bg-light py-2 border-bottom">
      <div className="container-fluid d-flex justify-content-around align-items-center">
        {/* Left side */}
        <div className="d-flex justify-content-between align-items-center">
                <img src="/myjumia-bottom-logo.png" className="jumia" alt="bottomLogo" id="myjumia-bottom-logo"></img>
          <form className="d-flex w-100" style={{ maxWidth: '500px' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search products, brands and categories"
            />
            <button className="btn btn-warning ms-2">Search</button>
          </form>
        </div>

        {/* Right side */}
        <div className="d-flex align-items-center gap-3">
          {/* Account */}
          <div className="position-relative">
            <FaUser
              size={20}
              style={{ cursor: 'pointer' }}
              onClick={toggleDropdown}
            />
            <span className="ms-1" style={{ cursor: 'pointer' }} onClick={toggleDropdown}>
              {showuserinfo ? userinfo.first_name :'Account'}
            </span>
            {showDropdown && (
              showuserinfo ?(
                <div
                className="dropdown-menu show position-absolute end-0 mt-2"
                style={{ zIndex: 999 }}
              >
              <span className="dropdown-item" onClick={()=>navigate('/profile')}>Profile</span>
              <span className="dropdown-item" onClick={()=>navigate('/order')}>Orders</span>
               
                <span className="dropdown-item" onClick={sublogout}>Logout</span>
              </div>):( <div
                className="dropdown-menu show position-absolute end-0 mt-2"
                style={{ zIndex: 999 }}
              >
                <span className="dropdown-item" onClick={()=>navigate('/login')}>Login</span>
               
               
              </div>)
             
            )}
          </div>

          {/* Help */}
          <div className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
            <FaQuestionCircle size={18} />
            <span className="ms-1">Help</span>
          </div>

          {/* Cart */}
          <div className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
            <FaShoppingCart size={18} />
            <span className="ms-1">Cart</span>
          </div>
        </div>
      </div>

      
    </div>
  )
}
