// src/components/EmailVerification.jsx
import React, { useState,useContext, useRef, useEffect } from 'react';
import './active.css';

import { useNavigate } from "react-router-dom";
import { instance } from "../../axiosInstance/instance";
import { UserContext } from '../../Context/user';
const EmailVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(59);
  const inputRefs = useRef([]);
  const { user, setUser } = useContext(UserContext);
      
  const navigate = useNavigate();
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const handleChange = (index, value) => {
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== '' && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

const maskedEmail = user.email.replace(/(.{3}).+(@.+)/, '$1...$2');
  return (
    <div className="verify-container">
        <img className="verify-icon"alt="jumia logo" src="/myjumia-top-logo.png" id="myjumia-top-logo"></img>
     
      <h2 className="verify-title">أكد على بريدك الالكتروني</h2>
      <p className="verify-subtitle">تم إرسال رمز تحقق إلى:</p>
      <p className="verify-email">{maskedEmail}</p>

      <div className="otp-inputs">
        {otp.map((digit, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            ref={(el) => (inputRefs.current[i] = el)}
          />
        ))}
      </div>

      <button className="send-btn">إرسال</button>

      <div className="resend-text">
        لم تتلقَ الرمز؟ اطلب رمز جديد بعد <span>{timer}</span> ثواني
      </div>

      <p className="support-text">
        لمزيد من الدعم، يمكنك زيارة مركز المساعدة أو الاتصال بفريق خدمة العملاء.
      </p>

      <div className="logo">JUMIA<span className="star">★</span></div>
    </div>
  );
};

export default EmailVerification;
