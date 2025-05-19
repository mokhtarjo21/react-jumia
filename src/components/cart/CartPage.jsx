// src/pages/CartPage.jsx
import React, { useEffect, useState } from 'react';
import {
  getCartFromCookies,
  removeCartItem,
  updateCartItem,
  clearCart,
} from '../../utils/cartCookie';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  const refreshCart = () => {
    setCart(getCartFromCookies());
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const handleQtyChange = (item, newQty) => {
    if (newQty < 1) return;
    updateCartItem(item.productid, item.color, item.size, newQty);
    refreshCart();
  };

  const handleRemove = (item) => {
    removeCartItem(item.productid, item.color, item.size);
    refreshCart();
  };

  const handleClear = () => {
    clearCart();
    refreshCart();
  };

  
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center fw-bold">🛒Your cart</h2>

      {cart.length === 0 ? (
        <div className="alert alert-info text-center py-4 shadow-sm">
        Empty Cart
        </div>
      ) : (
        <div className="row">
         
          <div className="col-lg-8">
            {cart.map((item, index) => (
              <div
                key={index}
                className="d-flex align-items-center border rounded mb-3 p-3 shadow-sm"
                style={{ backgroundColor: '#fff' }}
              >
                <img
                  src={'http://localhost:8000'+item.product.image || '/media/default.jpg'}
                  alt={item.product.name}
                  style={{ width: 120, height: 120, objectFit: 'contain' }}
                  className="me-3"
                />
                <div className="flex-grow-1">
                  <h5 className="mb-1">{item.product.name}</h5>
                  <p className="mb-1 text-muted">
                    Color: <strong>{item.color || 'Null'}</strong> | Size:{' '}
                    <strong>{item.size || 'Null'}</strong>
                  </p>
                  <p className="mb-2 fw-bold" style={{ color: '#ff6600' }}>
                    : {item.product.price.toLocaleString()} EGP
                  </p>
                  <div className="d-flex align-items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        handleQtyChange(item, parseInt(e.target.value))
                      }
                      className="form-control"
                      style={{ width: 70 }}
                    />
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemove(item)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-lg-4">
            <div className="border rounded p-4 shadow-sm sticky-top" style={{ top: '20px' }}>
              <h4 className="fw-bold mb-4">Cart</h4>
              <p className="d-flex justify-content-between mb-2">
                <span>Quantity :</span>
                <span>{cart.length}</span>
              </p>
              <p className="d-flex justify-content-between mb-3">
                <span>Total Price :</span>
                <span className="fw-bold" style={{ color: '#ff6600' }}>
                  {totalPrice.toLocaleString()} EGP
                </span>
              </p>
              <button className="btn btn-warning w-100 fw-bold" onClick={handleClear}>
                🧹Remove Cart
              </button>
              <button
                className="btn btn-primary w-100 mt-3 fw-bold"
                
                onClick={() => alert('Checkout functionality not implemented yet')}
              >
               Check out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
