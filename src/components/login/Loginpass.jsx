import React, { useState, useContext } from "react";
import './loginpass.css';
import { UserContext } from '../../Context/user';
import { useNavigate } from "react-router-dom";
import { instance } from "../../axiosInstance/instance";
import { getCartFromCookies, clearCart } from '../../utils/cartCookie';
import { toast } from 'react-toastify';
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const syncCartToBackend = async (token) => {
    const cart = getCartFromCookies();
    for (let item of cart) {
      try {
        await instance.post('/api/cart/', {
          product: item.product.id,
          quantity: item.quantity,
          color: item.color || null,
          size: item.size || null
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } catch (err) {
        console.error("Cart sync error:", err);
      }
    }
    clearCart(); // clear local cookie after syncing
  };

  const Summits = async () => {
    try {
      const response = await instance.post('/users/api/token/', {
        username: user.email,
        password: user.password
      });

      if (response.status === 200) {
        const access = response.data.access;
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', response.data.refresh);
        
        toast.success("Login Successfully");
         syncCartToBackend(access); // ✅ sync cookie cart now
        navigate("/");
      } else {
        alert("Error occurred while logging in. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      document.getElementById("error-message").innerText =
        "Email or password is incorrect. Please try again.";
    }
  };

  return (
    <div className="login-container">
      <img className="logo" alt="jumia logo" src="/myjumia-top-logo.png" id="myjumia-top-logo" />
      <h1 className="login-title">Welcome back!</h1>
      <p className="login-subtitle">Log back into your Jumia account.</p>

      <div className="login-box">
        <div className="email-box">
          <span>{user.email}</span>
          <button className="edit-btn" onClick={() => navigate("/login")}>Edit</button>
        </div>

        <div className="password-box">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="show-password-btn"
          >
            {showPassword ? '👁️' : '🙈'}
          </button>
        </div>

        <p id="error-message" className="text-danger"></p>
        <button onClick={Summits} className="login-btn">Log in</button>

        <div className="forgot-password">Forget your Password</div>

        <p className="support-text">
          For further support, you may visit the Help Center or contact our customer service team.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
