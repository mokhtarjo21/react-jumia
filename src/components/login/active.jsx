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
  const [canResend, setCanResend] = useState(false);   
  const navigate = useNavigate();
 

  const handleSubmit = async (e) => {
   
    const otpString = otp.reverse().join('');
   
    console.log('OTP:', otpString);
    try {
      const response = await instance.post('/users/api/active', { email:user.email,code: otpString });
      if (response.status === 200) {
       
        console.log('OTP verified successfully');
         navigate('/login/info1');
      }
    } catch (error) {
      document.getElementById("erorrotp").innerHTML = "الرمز غير صحيح";
      console.error('Error verifying OTP:', error);
    }
  };
const resendotp = async () => {
  try {
    const response = await instance.post('/users/api/resend', { email: user.email });
    if (response.status === 200) {
      console.log('Resend OTP successfully');
      setTimer(59);
      setCanResend(false);
    }
  } catch (error) {
    console.error('Error resending OTP:', error);
  }
};
  useEffect(() => {
  if (timer > 0) {
    const countdown = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  } else {
    setCanResend(true); // السماح بإعادة الإرسال
  }
}, [timer]);


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

const maskedEmail = user.email.replace(/(.{1}).+(@.+)/, '$1...$2');
  return (
    <div className="verify-container">
        <img className="verify-icon"alt="jumia logo" src="/myjumia-top-logo.png" id="myjumia-top-logo"></img>
     
      <h2 className="verify-title">Verify your email address </h2>
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
      <p id="erorrotp" ></p>

      <button className="send-btn" onClick={()=>{handleSubmit()}} >إرسال</button>

      <div id="resend" className="resend-text">
  {canResend ? (
    <span onClick={resendotp} style={{ cursor: 'pointer', color: 'blue' }}>إعادة إرسال الرمز</span>
  ) : (
    <>لم تتلقَ الرمز؟ اطلب رمز جديد بعد <span>{timer}</span> ثواني</>
  )}
</div>


      <p className="support-text">
        لمزيد من الدعم، يمكنك زيارة مركز المساعدة أو الاتصال بفريق خدمة العملاء.
      </p>

      <div className="logo">JUMIA<span className="star">★</span></div>
    </div>
  );
};

export default EmailVerification;
