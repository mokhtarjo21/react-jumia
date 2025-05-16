import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Optional for toggle icons

const PersonalInfoForm = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    console.log({ phone, password });
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
                <span className="input-group-text px-3">+20</span>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Phone number *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div className="mb-3 position-relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control pe-5"
                  placeholder="Password *"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
