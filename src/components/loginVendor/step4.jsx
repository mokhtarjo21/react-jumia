import React, { useState,useContext, useEffect } from "react";


import { useNavigate } from "react-router-dom";
import { instance } from "../../axiosInstance/instance";
import { UserContext } from '../../Context/user';
const ShopInformationForm = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [agreed, setAgreed] = useState(false);
  useEffect(() => {
    setUser({
      ...user,
      accountType: 'Business',})
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreed) {
      alert("You must agree to the terms to proceed.");
      return;
    }
    console.log(user);
    navigate('/loginvendor/step5'); // Navigate to the next step
  };

  return (
    <div className="container my-5">
      <div className="row align-items-start justify-content-center">
        {/* Left Image */}
        <div className="col-md-6 d-none d-md-block text-center">
          <img src="/signup-background.svg" alt="Shop" className="img-fluid" />
        </div>

        {/* Right Form */}
        <div className="col-md-6 col-lg-5">
          <div className="border p-4 rounded shadow bg-white">
            <h4 className="text-center mb-2">Shop Information</h4>
            <p className="text-center text-muted">Setup your shop by completing the following details</p>

            <form onSubmit={handleSubmit}>
              {/* Account Type Toggle */}
              <div className="mb-3">
                <label className="form-label d-block">Account type</label>
                <div className="btn-group w-100" role="group">
                  <input
                    type="radio"
                    className="btn-check"
                    name="accountType"
                    id="business"
                    value="Business"
                    checked={user.accountType === 'Business'}
                    onChange={() => setUser({...user,accountType:'Business'})}
                  />
                  <label className="btn btn-outline-warning" htmlFor="business">
                    <i className="bi bi-briefcase-fill me-2"></i>Business
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    name="accountType"
                    id="individual"
                    value="Individual"
                    checked={user.accountType === 'Individual'}
                    onChange={() => setUser({...user,accountType:'Individual'})}
                  />
                  <label className="btn btn-outline-warning" htmlFor="individual">
                    <i className="bi bi-person-fill me-2"></i>Individual
                  </label>
                </div>
              </div>

              {/* Shop Name */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Shop name *"
                  value={user.shopName}
                  onChange={(e) => setUser({...user,shopName:e.target.value})}
                  required
                />
              </div>

              {/* Shipping Zone */}
              <div className="mb-3">
                <select
                  className="form-select"
                  value={user.shippingZone}
                  onChange={(e) => setUser({...user,shippingZone:e.target.value})}
                  required
                >
                  <option value="">Shipping Zone *</option>
                  <option value="Cairo">Cairo</option>
                  <option value="Giza">Giza</option>
                  <option value="Alexandria">Alexandria</option>
                </select>
              </div>

              {/* Referral Source */}
              <div className="mb-3">
                <select
                  className="form-select"
                  value={user.referralSource}
                  onChange={(e) => setUser({...user,referralSource:e.target.value})}
                  required
                >
                  <option value="">How did you hear about Jumia? *</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Google">Google</option>
                  <option value="Friend">Friend</option>
                </select>
              </div>

              {/* Agreement Checkbox */}
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="agree"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                />
                <label className="form-check-label" htmlFor="agree">
                  I hereby confirm that I have read and I agree to the <a href="#">Jumia seller contract</a>, <a href="#">Jumia codes</a>, <a href="#">policies and guidelines</a>, and <a href="#">Privacy Notice and Cookie Notice</a>.
                </label>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-warning w-100">SUBMIT</button>
            </form>
          </div>

          {/* Progress Bar (Bottom Dots) */}
          <div className="d-flex justify-content-center mt-4 gap-3">
            <div className="rounded-circle bg-warning" style={{ width: 12, height: 12 }}></div>
            <div className="rounded-circle bg-warning" style={{ width: 12, height: 12 }}></div>
            <div className="rounded-circle bg-warning" style={{ width: 12, height: 12 }}></div>
            <div className="rounded-circle bg-warning" style={{ width: 12, height: 12 }}></div>
            <div className="rounded-circle bg-light border" style={{ width: 12, height: 12 }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopInformationForm;
