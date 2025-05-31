import React, { useEffect } from 'react';
import { clearCart } from '../../utils/cartCookie';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        clearCart(); // Remove items from cookies
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000); // Redirect after 3 seconds

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="container text-center mt-5">
            <h2 className="text-success">✅ Payment Successful!</h2>
            <p className="mt-3">Thank you for your purchase. Redirecting you to the homepage...</p>
        </div>
    );
};

export default PaymentSuccess;
