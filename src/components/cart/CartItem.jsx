// src/components/Cart/CartItem.jsx
import React from 'react';

const CartItem = ({ item }) => {
  const { product, quantity } = item;

  return (
    <div className="cart-item">
      <img src={product.image || '/placeholder.jpg'} alt={product.name} />
      <div className="cart-details">
        <h4>{product.name}</h4>
        <p>Quantity: {quantity}</p>
        <p>Price: EGP {product.price}</p>
      </div>
    </div>
  );
};

export default CartItem;
