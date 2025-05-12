import React, { useState,useContext } from "react";
import './loginpass.css'; 
import { UserContext } from '../../Context/user';

import { useNavigate } from "react-router-dom";
import { instance } from "../../axiosInstance/instance";

const LoginForm = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  return (
    <div className="login-container">
     <img className="logo" alt="jumia logo" src="/myjumia-top-logo.png" id="myjumia-top-logo"></img>
      <h1 className="login-title">مرحبًا بعودتك!</h1>
      <p className="login-subtitle">قم بتسجيل الدخول مرة أخرى إلى حساب Jumia الخاص بك.</p>

      <div className="login-box">
        <div className="email-box">
          <span>{user.email}</span>
          <button className="edit-btn"
          onClick={() => navigate("/")}
          >تعديل</button>
        </div>

        <div className="password-box">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="كلمة السر"
            value={user.password}
            onChange={(e) => setUser({...user,password:e.target.value})}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="show-password-btn"
          >
            {showPassword ? '👁️' : '🙈'}
          </button>
        </div>

        <button className="login-btn">تسجيل الدخول</button>

        <div className="forgot-password">هل نسيت كلمة المرور؟</div>

        <p className="support-text">
          لمزيد من الدعم، يمكنك زيارة مركز المساعدة أو الاتصال بفريق خدمة العملاء.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
