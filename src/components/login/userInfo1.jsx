
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState,useContext } from "react";


import { useNavigate } from "react-router-dom";

import { UserContext } from '../../Context/user';

const CreateAccountForm = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const email =user.email;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert('The passwords do not match.');
      return;
    }

    console.log({ email, password });
    navigate('/login/info2');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
      <div className="text-center w-100" style={{ maxWidth: '400px' }} dir="rtl">
        {/* Orange Icon */}
        <img className="logo" alt="jumia logo" src="/myjumia-top-logo.png" id="myjumia-top-logo"></img>
        <h5 className="fw-bold">Create Account</h5>
        <p className="text-muted small">To start creating your account, to keep your account secure, we need a strong password!</p>

        {/* Email Box */}
        <div className="d-flex justify-content-between align-items-center bg-light p-2 rounded mb-3">
          <span className="text-muted">تعديل</span>
          <span className="fw-bold">{email}</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="text-end">
          <div className="mb-3">
            <label htmlFor="password" className="form-label visually-hidden">Password</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-eye-slash"></i></span>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                
                onChange={(e) => setUser({...user,password:e.target.value})}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label visually-hidden">Confirm password</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-eye-slash"></i></span>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                placeholder="Confirm password" 
                
                onChange={(e) => setUser({...user,confirmPassword:e.target.value})}
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-100 fw-bold"
            style={{ backgroundColor: '#f89406', color: 'white' }}
          >
            Contiune
          </button>
        </form>

        {/* Footer Note */}
        <p className="text-muted small mt-4">
         For further support, you can visit the Help Center or contact our customer service team.
        </p>

        <p className="text-center fw-bold mt-2">JUMIA <span className="text-warning">●</span></p>
      </div>
    </div>
  );
};

export default CreateAccountForm;
