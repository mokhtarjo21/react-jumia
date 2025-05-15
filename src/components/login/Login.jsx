import React, { useState,useContext } from "react";
import "./login.css"; 

import { useNavigate } from "react-router-dom";
import { instance } from "../../axiosInstance/instance";
import { UserContext } from '../../Context/user';
export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  
   const createuser = async () => {
      try {
        const response = await instance.post('/users/api/register', {email: user.email});
        if (response.status === 200) {
          console.log('User created successfully');
        }
      } catch (error) {
        console.error('Error creating user:', error);
      }
    };
    
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const checkemail= async () => {
      try {
        const response = await instance.post("/users/api/check_email", {
         email: user.email,
        },  { headers: { 'Content-Type': 'application/json' } });
        console.log(response.data);
        if (response.data.user === "1") {
          
          navigate("/login");
        } else {
          createuser();
          navigate("active");
         
        }
      } catch (error) {
        navigate("active");
        console.error("Error during login:", error);
        alert("خطأ في تسجيل الدخول");
      }
    }
    checkemail();
    
  };

  return (
    <div className="login-container">
      <div className="login-box">
      <img className="logo" alt="jumia logo" src="/myjumia-top-logo.png" id="myjumia-top-logo"></img>
        <h2>Welcome to Jumia</h2>
        <p>Type your e-mail or phone number to log in or create a Jumia account.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({...user,email:e.target.value})}
            required
          />
          <button type="submit" className="continue-btn">continue</button>
        </form>
        <p className="terms">
         By continuing you agree to Jumia’s<a href="#">Terms and Conditions
</a>
        </p>
        <button className="facebook-btn">Log in With Facebook</button>
        <p className="foote">For further support, you may visit the Help Center or contact our customer service team.</p>
        <img src="/myjumia-bottom-logo.png" className="jumia" alt="bottomLogo" id="myjumia-bottom-logo"></img>
      </div>
    </div>
  );
}
