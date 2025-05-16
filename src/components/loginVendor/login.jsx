
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState,useContext } from "react";

import { UserContext } from '../../Context/user';

import { useNavigate } from "react-router-dom";
import { instance } from "../../axiosInstance/instance";

function VendorLogin() {
    
    const [showPassword, setShowPassword] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
  return (
    <>  
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light no-wrap">
     
      <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Vendor Center</h3><br />
       

        <div className="form-group mb-3">
          <label className="text-muted small">Email</label>
          <div className="input-group">
            <span className="input-group-text bg-white border-orange">
              <i className="bi bi-person-fill"></i>
              
            </span>
            <input type="email" className="form-control border-orange" placeholder="Enter your email" />
          </div>
        </div>
         
        <div className="input-group mb-3">
  <span className="input-group-text bg-white">
    <i className="bi bi-key-fill"></i>
  </span>
  <input type={showPassword ? 'text' : 'password'} className="form-control" placeholder="Password" aria-label="Recipient’s username" aria-describedby="button-addon2" />
  <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="show-password-btn"
          >
            {showPassword ? '👁️' : '🙈'}
          </button>
</div>
    

        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" id="rememberMe" />
          <label className="form-check-label" htmlFor="rememberMe">
            Remember me
          </label>
        </div>

        <div className="d-grid">
          <button className="btn btn-warning text-white">Log In</button>
        </div>

        <hr />

        <div className="text-center small mt-2 text-muted">
          <i className="bi bi-star-fill text-warning me-1"></i>
          Joining us from Seller Center?{" "}
          <span onClick={()=>navigate('/loginvendor/register')} className="text-orange text-decoration-none">
            Click here
          </span>
        </div>

        <div className="text-center mt-2">
          <a href="#" className="text-orange text-decoration-none small">
            Forgot Password?
          </a>
        </div>

        <div className="text-center mt-4">
          <img src="./myjumia-bottom-logo.png" alt="Jumia Logo" style={{ height: "24px" }} />
        </div>
      </div>
    </div>
    </>
  );
}

export default VendorLogin;
