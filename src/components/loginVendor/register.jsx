import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with an actual API call to your backend or Keycloak endpoint
    console.log('Reset password requested for:', email);
    setSubmitted(true);
  };

  return (
    <div className="bg-light vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow-sm p-4" style={{ maxWidth: '450px', width: '100%' }}>
        

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label text-muted small">Email</label>
              <div className="input-group">
                <span className="input-group-text bg-white border-warning">
                  <i className="bi bi-person" />
                </span>
                <input
                  type="email"
                  className="form-control border-warning"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <a href="/login" className="btn btn-link p-0">← Back</a>
              <button type="submit" className="btn btn-warning text-white">
                Submit
              </button>
            </div>
          </form>
        ) : (
          <div className="alert alert-success text-center">
            If the email exists, a reset link has been sent.
          </div>
        )}

        <hr />
        <p className="text-muted small text-center">
          Enter your email address and we will send you instructions on how to create a new password.
        </p>

        <div className="text-center mt-3">
          
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
