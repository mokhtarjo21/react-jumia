import React, { useState,useContext } from "react";


import { useNavigate } from "react-router-dom";

import { UserContext } from '../../Context/user';
function EmailVerification() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [touched, setTouched] = useState(false);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (user.email.trim() === '') return;
    
    // Handle submission (e.g., API call)
    console.log("Verifying email:", email);
  };

  return (
    <div className="d-flex vh-100 bg-light">
      {/* Left illustration section */}
      <div className="w-50 d-flex justify-content-center align-items-center bg-white">
        <img
          src="/signup-background.svg"
          alt="Store Illustration"
          style={{ maxHeight: '70%', objectFit: 'contain' }}
        />
      </div>

      {/* Right form section */}
      <div className="w-50 d-flex justify-content-center align-items-center">
        <div style={{ maxWidth: '400px', width: '100%' }}>
          <h4 className="mb-2">Setup your account</h4>
          <p className="text-muted small mb-4">
            Please provide your email address to create your seller account
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              
               <div className="form-control email-box">
          <span>{user.email}</span>
          <span className="edit-btn"
          onClick={() => navigate("/loginvendor/step2")}
          >Edite</span>
        </div>
              <input
                type="number"
                placeholder="Verification Code"
                maxLength={4}
                id="code"
                className={`form-control ${touched ? 'is-invalid' : ''}`}
               
                onChange={(e) => setUser({...user, code: e.target.value})}
                
                required
              />
              {touched && !email && (
                <div className="invalid-feedback">This field is required.</div>
              )}
            </div>

            <button type="submit" className="btn btn-warning text-white w-100">
              VERIFY
            </button>
          </form>

          {/* Stepper */}
          <div className="mt-4 text-center">
            <div className="d-flex justify-content-center gap-2">
              <span className="bg-warning rounded-circle" style={dotStyle(true)}></span>
              <span className="bg-warning rounded-circle" style={dotStyle(true)}></span>
              <span className="bg-warning rounded-circle" style={dotStyle(true)}></span>
              <span className="bg-secondary rounded-circle" style={dotStyle(false)}></span>
              <span className="bg-secondary rounded-circle" style={dotStyle(false)}></span>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}

// Dot styling
const dotStyle = (active) => ({
  height: '10px',
  width: '10px',
  display: 'inline-block',
  backgroundColor: active ? 'orange' : '#ccc',
  borderRadius: '50%',
});

export default EmailVerification;
