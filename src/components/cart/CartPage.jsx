import React, { useEffect, useState } from 'react';
import { instance } from '../../axiosInstance/instance';
import CartItem from './CartItem';
import './Cart.css';
import {
  getCartFromCookies,
  updateCartItem,
  removeCartItem
} from '../../utils/cartCookie'; // 🔄 make sure these exist

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const accessToken = localStorage.getItem('access');

  useEffect(() => {
    if (accessToken) {
      instance.get('/api/cart/', {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(res => setCart(res.data))
      .catch(() => setCart([]));
    } else {
      setCart(getCartFromCookies());
    }
  }, [accessToken]);

  const handleQuantityChange = (productId, color, size, delta) => {
    const updatedCart = cart.map(item => {
      if (
        item.product.id === productId &&
        item.color === color &&
        item.size === size
      ) {
        const newQty = item.quantity + delta;
        if (newQty > 0) {
          item.quantity = newQty;
          updateCartItem(item.product.id, color, size, newQty);
        }
      }
      return item;
    });
    setCart([...updatedCart]);
  };

  const handleRemoveItem = (productId, color, size) => {
    const filtered = cart.filter(
      item =>
        !(item.product.id === productId &&
          item.color === color &&
          item.size === size)
    );
    removeCartItem(productId, color, size);
    setCart(filtered);
  };

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
          <pre>{JSON.stringify(cart, null, 2)}</pre> {/* TEMPORARY DEBUGGING */}

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item, idx) => (
            <CartItem
              key={item.id || idx}
              item={item}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
