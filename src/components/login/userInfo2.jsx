
import React, { useState,useContext } from "react";

import { useNavigate } from "react-router-dom";
import { instance } from "../../axiosInstance/instance";
import { UserContext } from '../../Context/user';

const PersonalDetailsForm = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  
  const [agree,setAgree] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agree) {
      alert('Terms and Conditions must be accepted.');
      return;
    }
    console.log({ gender, dob });
    navigate('/login/info3');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
      <div className="text-center w-100" style={{ maxWidth: '400px' }} dir="rtl">
        {/* Orange Icon Circle */}
        <img className="logo" alt="jumia logo" src="/myjumia-top-logo.png" id="myjumia-top-logo"></img>

        {/* Title and Subtitle */}
        <h5 className="fw-bold">Personal details</h5>
        <p className="text-muted small mb-4">We're almost there... some more details.</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="text-end">
          {/* Gender */}
          <div className="mb-3">
            <label htmlFor="gender" className="form-label">Gender</label>
            <select
              id="gender"
              className="form-select"
             
              onChange={(e) => setUser({...user,gender:e.target.value})}
              required
            >
              <option value="">choose</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          
          <div className="mb-3">
            <label htmlFor="dob" className="form-label">Birth Date </label>
            <input
              id="dob"
              type="date"
              className="form-control"
              value={user.dob || ""}
              onChange={(e) => setUser({ ...user, gender: e.target.value })}

              required
            />
          </div>

          
          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="agree"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              required
            />
            <label className="form-check-label" htmlFor="agree">
              I have read and agree to<a href="#" className="text-warning text-decoration-none">Terms</a> and <a href="#" className="text-warning text-decoration-none">Provisions</a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: '#f89406', color: 'white' }}
          >
            Continue
          </button>
        </form>

        {/* Footer */}
        <p className="text-muted small mt-4">
          For further support, you can visit the Help Center or contact our customer service team.
        </p>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
