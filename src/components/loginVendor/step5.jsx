import React, { useState,useContext, useEffect } from "react";


import { useNavigate } from "react-router-dom";
import { instance } from "../../axiosInstance/instance";
import { UserContext } from '../../Context/user';
import { Eye, EyeOff } from 'lucide-react'; // Optional for toggle icons

const PersonalInfoForm = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting personal details:", user);
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    const submitData = async () => {
          try {
            const response = await instance.post('/users/api/info/', user,
              { headers: { 'Content-Type': 'application/json',
                // x-:  {localStorage.getItem('csrfToken')}
               } }
            );
            if (response.status === 200) {
              
              console.log('Token received:', response.data);
              console.log('Personal details submitted successfully');
               navigate('/loginvendor'); // Navigate to the next step
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
              navigate('/vendor'); // Navigate to the next step
             
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
    <div className="container my-5">
      <div className="row justify-content-center align-items-center">
        {/* Image / Illustration Column */}
        <div className="col-md-6 text-center d-none d-md-block">
          <img src="/signup-background.svg" alt="Shop Illustration" className="img-fluid" />
        </div>

        {/* Form Column */}
        <div className="col-md-6 col-lg-5">
          <div className="border p-4 rounded shadow bg-white">
            <h4 className="text-center mb-2">Personal Information</h4>
            <p className="text-center text-muted">Setup your password and provide your phone number</p>

            <form onSubmit={handleSubmit}>
              {/* Phone Input */}
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
                  placeholder="Phone number *"
                  value={user.phone}
                  onChange={(e) => setUser({...user, phone: e.target.value})}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="mb-3 position-relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control pe-5"
                  placeholder="Password *"
                  value={user.password}
                  onChange={(e) => setUser({...user, password: e.target.value})}
                  required
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              {/* Confirm Password Input */}
              <div className="mb-3 position-relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  className="form-control pe-5"
                  placeholder="Confirm Password *"
                  value={user.confirmPassword}
                  onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
                  required
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>

              <small className="text-muted d-block mb-3">
                Password should contain at least 8 characters containing a capital letter, a lower letter, a number and a special character
              </small>

              <button type="submit" className="btn btn-warning w-100">NEXT</button>
            </form>
          </div>
        </div>
      </div>

      {/* Optional: Step progress bar */}
      <div className="text-center mt-4">
        <div className="d-flex justify-content-center gap-3">
          <div className="rounded-circle bg-warning" style={{ width: 12, height: 12 }}></div>
          <div className="rounded-circle bg-warning" style={{ width: 12, height: 12 }}></div>
          <div className="rounded-circle bg-warning" style={{ width: 12, height: 12 }}></div>
          <div className="rounded-circle bg-warning" style={{ width: 12, height: 12 }}></div>
          <div className="rounded-circle bg-warning" style={{ width: 12, height: 12 }}></div>
          
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
