import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFailed = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh', textAlign: 'center' }}>
            <img
                src="https://cdn-icons-png.flaticon.com/512/753/753345.png"
                alt="failed"
                style={{ width: 100, height: 100, marginBottom: 20 }}
            />
            <h2 className="text-danger fw-bold">Payment Failed</h2>
            <p className="text-muted mb-4" style={{ maxWidth: 400 }}>
                Something went wrong with your payment. Please try again or use a different payment method.
            </p>
            <button className="btn btn-warning fw-bold" onClick={() => navigate('/')}>
                Back to Home
            </button>
        </div>
    );
};

export default PaymentFailed;
