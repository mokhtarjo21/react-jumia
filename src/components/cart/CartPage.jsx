import React, { useEffect, useState } from 'react';
import { instance } from '../../axiosInstance/instance';
import CartItem from './CartItem';
import './Cart.css';
import { getCartFromCookies } from '../../utils/cartCookie';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const accessToken = localStorage.getItem('access');

  useEffect(() => {
    if (accessToken) {
      // Logged in — fetch from backend
      instance.get('/api/cart/', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(res => setCart(res.data))
      .catch(err => {
        console.error('Error fetching backend cart:', err);
        setCart([]);  // fallback
      });
    } else {
      // Guest — load from cookies
      const localCart = getCartFromCookies();
      setCart(localCart);
    }
  }, [accessToken]);

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item, idx) => (
            <CartItem key={item.id || idx} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
