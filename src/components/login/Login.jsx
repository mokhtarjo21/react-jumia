import React, { useState,useContext } from "react";
import "./login.css"; 

import { useNavigate } from "react-router-dom";
import { instance } from "../../axiosInstance/instance";
import { UserContext } from '../../Context/user';
export default function Login() {
  const { user, setUser } = useContext(UserContext);
  
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const checkemail= async () => {
      try {
        const response = await instance.post("/users/api/check_email", {
         emai: user.email,
        });
        console.log(response.data);
        if (response.data.user === "1") {
          
          navigate("/login");
        } else {
          navigate("/active");
         
        }
      } catch (error) {
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
        <h2>مرحبًا بكم في Jumia</h2>
        <p>اكتب بريدك الإلكتروني أو رقم هاتفك لتسجيل الدخول أو إنشاء حساب على Jumia</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="عنوان البريد الإلكتروني "
            value={user.email}
            onChange={(e) => setUser({...user,email:e.target.value})}
            required
          />
          <button type="submit" className="continue-btn">استمرار</button>
        </form>
        <p className="terms">
          من خلال الاستمرار، فإنك توافق على <a href="#">الشروط والأحكام</a>
        </p>
        <button className="facebook-btn">تسجيل الدخول باستخدام الفيسبوك</button>
        <p className="foote">لمزيد من الدعم، يمكنك زيارة مركز المساعدة أو الاتصال بخدمة العملاء.</p>
        <img src="/myjumia-bottom-logo.png" className="jumia" alt="bottomLogo" id="myjumia-bottom-logo"></img>
      </div>
    </div>
  );
}
