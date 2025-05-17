
import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../axiosInstance/instance";
import { UserContext } from '../../Context/user';

const PersonalDetailsForm = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log( user );
    const submitData = async () => {
      try {
        const response = await instance.post('/users/api/info/', user);
        if (response.status === 200) {
          
          console.log('Token received:', response.data);
          console.log('Personal details submitted successfully');
          // navigate('/login/'); // Navigate to the next step
        } else {
          console.error('Failed to submit personal details');
        }
      } catch (error) {
        console.error('Error submitting personal details:', error);
      }
    }
    submitData();

    const accessapi = async () => {
      try {
        const response = await instance.post('/users/api/token/', {username: user.email, password: user.password});
        if (response.status === 200) {
          localStorage.setItem('access', response.data.access);
          localStorage.setItem('refresh', response.data.refresh);
          console.log('Token received:', response.data);
          console.log('Personal details submitted successfully');
          navigate('/'); // Navigate to the next step
         
        } else {
          console.error('Failed to submit personal details');
        }
      } catch (error) {
        console.error('Error submitting personal details:', error);
      }
    }
    accessapi();
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
      <div className="text-center w-100" style={{ maxWidth: '400px' }}>
       <img className="logo" alt="jumia logo" src="/myjumia-top-logo.png" id="myjumia-top-logo"></img>
        <h5 className="fw-bold">Personal Details</h5>
        <p className="text-muted small">We just need a few more details.</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="text-start">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="First Name*"
              value={user.firstName || ""}
              onChange={(e) => setUser({...user,firstName:e.target.value})}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name*"
              value={user.lastName || ""}
              onChange={(e) => setUser({...user,lastName:e.target.value})}
              required
            />
          </div>

          <div className="mb-3 d-flex">
            <select
              className="form-select me-2"
              value={user.countryCode || ""}
              onChange={(e) => setUser({...user,countryCode:e.target.value})}
              required
              style={{ maxWidth: '90px' }}
            >
              <option value="+20">+20</option>
              <option value="+966">+966</option>
              <option value="+971">+971</option>
              <option value="+1">+1</option>
            </select>

            <input
              type="tel"
              className="form-control"
              placeholder="Phone Number*"
              value={user.phone || ""}
              onChange={(e) => setUser({...user,phone:e.target.value})}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100 fw-bold"
            style={{ backgroundColor: '#f89406', color: 'white' }}
          >
            Continue
          </button>
        </form>

        {/* Footer Note */}
        <p className="text-muted small mt-4">
          For more support, you can visit the Help Center or contact Customer Service.
        </p>

        <p className="text-center fw-bold mt-2">JUMIA <span className="text-warning">●</span></p>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
