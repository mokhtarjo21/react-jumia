// src/components/Cart/CartItem.jsx
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import './Cart.css';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const { product, quantity, color, size } = item;

const imageUrl =
  product.image ||
  (product.product_images?.[0]?.image
    ? `http://127.0.0.1:8000${product.product_images[0].image}`
    : '/placeholder.jpg');  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <div className="row cart-item py-3 border-bottom align-items-center">
      
      {/* Product image */}
      <div className="col-3 col-md-2">
        <img
          src={imageUrl}
          alt={product.name}
          className="img-fluid rounded"
          style={{ maxHeight: '80px', objectFit: 'cover' }}
        />
      </div>

      {/* Product info */}
      <div className="col-6 col-md-5">
        <h6 className="mb-1 fw-bold">{product.name}</h6>
        {product.brand_name && <p className="mb-1 text-muted">{product.brand_name}</p>}
        {color && <p className="mb-1">Color: {color}</p>}
        {size && <p className="mb-1">Size: {size}</p>}
        <p className="mb-1">EGP {product.price}</p>
      </div>

      {/* Quantity and total */}
      <div className="col-3 col-md-3 d-flex flex-column align-items-center">
        <div className="d-flex align-items-center mb-1">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => onQuantityChange(product.id, color, size, -1)}
          >-</button>

          <span className="mx-2">{quantity}</span>

          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => onQuantityChange(product.id, color, size, 1)}
          >+</button>
        </div>
        <div className="text-success fw-bold">EGP {totalPrice}</div>
      </div>

      {/* Remove */}
      <div className="col-12 col-md-2 text-end mt-2 mt-md-0">
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => onRemove(product.id, color, size)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
