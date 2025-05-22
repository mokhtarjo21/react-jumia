import React, { useState } from 'react';
import axios from 'axios';
import { getCartFromCookies, clearCart } from '../../utils/cartCookie';

const CheckoutPage = () => {
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handlePlaceOrder = async () => {
        const cart = getCartFromCookies();

        if (!address.trim()) {
            setError('Please enter a shipping address.');
            return;
        }

        if (!cart || cart.length === 0) {
            setError('Your cart is empty.');
            return;
        }

        try {
            // Prepare cart payload
            const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

            const orderResponse = await axios.post(
                'http://localhost:8000/api/orders/checkout/',
                {
                    shipping_address: address,
                    payment_method: paymentMethod,
                    cart_items: cart,
                    total_price: totalPrice,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('access')}`,
                    },
                }
            );

            const orderIds = orderResponse.data.order_ids;

            if (paymentMethod === 'paymob') {
                const paymobResponse = await axios.post(
                    'http://localhost:8000/api/orders/paymob/',
                    { total_price: totalPrice },
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('access')}`,
                        },
                    }
                );

                const iframeUrl = paymobResponse.data.iframe_url;
                window.location.href = iframeUrl;
            } else {
                clearCart();
                setMessage(`✅ Order placed successfully! Order ID(s): ${orderIds.join(', ')}`);
                setError('');
            }
        } catch (err) {
            console.error('Axios error:', err);
            setMessage('');
            setError(err.response?.data?.error || 'Something went wrong during checkout.');
        }
    };

    return (
        <div className="container my-5" style={{ maxWidth: 600 }}>
            <div className="text-center mb-4">
                <img
                    src="https://www.jumia.com.eg/assets_he/images/logo.png"
                    alt="JUMIA"
                    style={{ maxWidth: 150 }}
                />
            </div>

            <div className="p-4 border rounded shadow-sm bg-white">
                <h3 className="fw-bold mb-4">Finish Checkout</h3>

                {message && (
                    <div className="alert alert-success fw-bold" role="alert">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                <div className="mb-4">
                    <label className="form-label fw-bold">Shipping Address</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        placeholder="e.g. Ahmed, 5 El Tahrir St, Cairo, Egypt"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label fw-bold">Payment Method</label>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="cod"
                            value="cod"
                            checked={paymentMethod === 'cod'}
                            onChange={() => setPaymentMethod('cod')}
                        />
                        <label className="form-check-label" htmlFor="cod">Cash on Delivery</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="paymob"
                            value="paymob"
                            checked={paymentMethod === 'paymob'}
                            onChange={() => setPaymentMethod('paymob')}
                        />
                        <label className="form-check-label" htmlFor="paymob">Pay Online</label>
                    </div>
                </div>

                <button
                    className="btn btn-warning w-100 fw-bold text-uppercase"
                    onClick={handlePlaceOrder}
                >
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default CheckoutPage;
