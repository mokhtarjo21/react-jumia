// src/components/Cart/CartPage.jsx
import React, { useEffect, useState } from 'react';
import { instance } from "../../axiosInstance/instance";
import CartItem from './CartItem';
import './Cart.css';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    instance.get('/api/cart/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`
      }
    })
    .then(res => setCart(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
