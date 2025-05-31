import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../utils/cartCookie';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        clearCart();
        const timer = setTimeout(() => {
            navigate('/');
        }, 4000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '80vh', textAlign: 'center' }}>
            <img
                src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
                alt="success"
                style={{ width: 100, height: 100, marginBottom: 20 }}
            />
            <h2 className="fw-bold text-success">Payment Successful!</h2>
            <p className="text-muted" style={{ maxWidth: 400 }}>
                Thank you for shopping with us. Redirecting to homepage...
            </p>
            <div className="spinner-border mt-4" style={{ color: '#f68b1e' }} role="status" />
        </div>
    );
};

export default PaymentSuccess;
