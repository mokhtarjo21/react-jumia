import React, { useState,useContext } from "react";


import { useNavigate } from "react-router-dom";

import { UserContext } from '../../Context/user';
const CountrySelection = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (user.country.trim() === '') return;
    console.log('Selected country:', country);
    navigate('/loginvendor/step2'); // Navigate to the next step
  };

  const countries = ['Nigeria', 'Kenya', 'Egypt', 'Morocco', 'South Africa']; // Add more as needed

  return (
    <div className="d-flex vh-100 bg-light">
      {/* Left image/illustration */}
      <div className="w-50 d-flex justify-content-center align-items-center bg-white">
        <img
          src="/signup-background.svg"
          alt="Store Illustration"
          style={{ maxHeight: '70%', objectFit: 'contain' }}
        />
      </div>

      {/* Right form section */}
      <div className="w-50 d-flex justify-content-center align-items-center">
        <div style={{ maxWidth: '400px', width: '100%' }}>
          <h4 className="mb-2">Sell on Jumia</h4>
          <p className="text-muted small mb-4">Choose the country of your shop</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="country" className="form-label d-none">Country</label>
              <select
                id="country"
                className={`form-select ${touched && !country ? 'is-invalid' : ''}`}
                value={user.country}
                onChange={(e) => setUser({ ...user, country: e.target.value })}
                onBlur={() => setTouched(true)}
              >
                <option value="">Select your country *</option>
                {countries.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {touched && !country && (
                <div className="invalid-feedback">Please select a country.</div>
              )}
            </div>

            <button type="submit" className="btn btn-warning w-100 text-white">
              NEXT
            </button>
          </form>

          {/* OR Section */}
          <div className="text-center my-3">
            <span className="text-muted">OR</span>
          </div>

          <button className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center">
            <i className="bi bi-globe2 me-2"></i>
            Sell Globally on Jumia
          </button>

          <p className="text-muted mt-2 small text-center">
            Register as a Jumia Global seller and sell your products across Africa.
            <br />
            <a href="https://www.jumia-global.com/" target="_blank" rel="noopener noreferrer">
              Know more about Jumia Global
            </a>
          </p>

          {/* Already have account */}
          <p className="text-center mt-4">
            Already have an account? <span onClick={()=>navigate('/loginvendor')}>Sign in</span>
          </p>

          <div className="mt-4 text-center">
            <div className="d-flex justify-content-center gap-2">
              <span className="bg-warning rounded-circle" style={dotStyle(true)}></span>
              <span className="bg-secondary rounded-circle" style={dotStyle(false)}></span>
              <span className="bg-secondary rounded-circle" style={dotStyle(false)}></span>
              <span className="bg-secondary rounded-circle" style={dotStyle(false)}></span>
              <span className="bg-secondary rounded-circle" style={dotStyle(false)}></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};
const dotStyle = (active) => ({
  height: '10px',
  width: '10px',
  display: 'inline-block',
  backgroundColor: active ? 'orange' : '#ccc',
  borderRadius: '50%',
});
export default CountrySelection;
