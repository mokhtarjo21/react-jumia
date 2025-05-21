import React, { useEffect, useState } from 'react';
import {
  getCartFromCookies,
  removeCartItem,
  updateCartItem,
  clearCart,
} from '../../utils/cartCookie';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const MAX_QTY = 10;

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [saved, setSaved] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const refreshCart = () => {
    setCart(getCartFromCookies());
  };

  // ✅ FIX: Only run once on mount
  useEffect(() => {
    refreshCart();
  }, []);

  const handleQtyChange = (item, newQty) => {
    if (newQty < 1) {
      removeCartItem(item.product.id, item.color, item.size);
    } else if (newQty > MAX_QTY) {
      alert('Max 10 items allowed.');
    } else {
      updateCartItem(item.product.id, item.color, item.size, newQty);
    }
    refreshCart();
  };

  const handleRemove = (item) => {
    removeCartItem(item.product.id, item.color, item.size);
    refreshCart();
  };

  const handleClear = () => {
    clearCart();
    refreshCart();
  };

  const handleSaveForLater = (item) => {
    setSaved((prev) => [...prev, item]);
    removeCartItem(item.product.id, item.color, item.size);
    refreshCart();
  };

  const handleApplyCoupon = () => {
    const code = coupon.trim().toLowerCase();
    if (code === 'save10') {
      setDiscount(0.1);
      alert('Coupon applied: 10% off');
    } else if (code === 'flat50') {
      setDiscount(50);
      alert('Coupon applied: EGP 50 off');
    } else {
      setDiscount(0);
      alert('Invalid coupon code');
    }
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const discountAmount =
    typeof discount === 'number'
      ? discount < 1
        ? totalPrice * discount
        : discount
      : 0;

  const finalPrice = Math.max(totalPrice - discountAmount, 0);

  return (
    <div className="container my-5">
      <h2 className="mb-4 fw-bold text-uppercase border-bottom pb-2">
        🛒 My Cart
      </h2>

      {finalPrice >= 500 ? (
        <div className="alert alert-success text-center">
          🎉 Congrats! You qualify for <strong>free shipping</strong>!
        </div>
      ) : (
        <div className="alert alert-warning text-center">
          Spend <strong>EGP {500 - finalPrice}</strong> more for free shipping!
        </div>
      )}

      {cart.length === 0 ? (
        <div className="text-center py-5">
          <img
            src="https://www.jumia.com.eg/assets_he/images/cart.4d288b64.svg"
            alt="Empty cart"
            style={{ width: '200px', marginBottom: '20px' }}
          />
          <h5 className="text-muted mb-3">Your cart is empty</h5>
          <a href="/" className="btn btn-warning px-4 fw-bold">
            Continue Shopping
          </a>
        </div>
      ) : (
        <>
          <div className="row">
            <div className="col-lg-8">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="d-flex border-bottom py-3 mb-3 align-items-start"
                  style={{ backgroundColor: '#fff' }}
                >
                  <img
                    src={
                      item.product.image
                        ? 'http://localhost:8000' + item.product.image
                        : '/media/default.jpg'
                    }
                    alt={item.product.name}
                    style={{ width: 100, height: 100, objectFit: 'contain' }}
                    className="me-3 border rounded"
                  />
                  <div className="flex-grow-1">
                    <h6 className="fw-bold mb-1">{item.product.name}</h6>
                    <p className="mb-1 text-muted small">
                      Sold by: <strong>Jumia Express</strong>
                    </p>
                    <p className="mb-1 text-muted small">
                      Color: <strong>{item.color || '—'}</strong> | Size:{' '}
                      <strong>{item.size || '—'}</strong>
                    </p>
                    <p className="text-success small mb-1">
                      Estimated delivery: <strong>1-3 business days</strong>
                    </p>
                    <p className="text-danger fw-bold mb-1">
                      Unit Price: EGP {item.product.price.toLocaleString()}
                    </p>
                    <p className="text-dark small mb-2">
                      Subtotal:{" "}
                      <strong>
                        EGP {(item.product.price * item.quantity).toLocaleString()}
                      </strong>
                    </p>

                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleQtyChange(item, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="fw-bold">{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleQtyChange(item, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm ms-2"
                        onClick={() => handleRemove(item)}
                      >
                        🗑️ Remove
                      </button>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleSaveForLater(item)}
                      >
                        💾 Save for Later
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {saved.length > 0 && (
                <div className="mt-5">
                  <h5 className="fw-bold mb-3">Saved for Later</h5>
                  {saved.map((item, idx) => (
                    <div key={idx} className="d-flex align-items-center border-bottom py-2">
                      <img
                        src={'http://localhost:8000' + item.product.image}
                        alt={item.product.name}
                        style={{ width: 80, height: 80, objectFit: 'contain' }}
                        className="me-3"
                      />
                      <div>
                        <div className="fw-bold">{item.product.name}</div>
                        <div className="text-muted small">EGP {item.product.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="d-flex justify-content-end mt-4">
                <a href="/" className="btn btn-outline-dark fw-bold">
                  ← Continue Shopping
                </a>
              </div>
            </div>

            <div className="col-lg-4">
              <div
                className="border rounded p-4 shadow-sm sticky-top"
                style={{ top: '20px', backgroundColor: '#fff' }}
              >
                <h5 className="fw-bold mb-4">Cart Summary</h5>

                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button className="btn btn-outline-primary w-100 mb-3" onClick={handleApplyCoupon}>
                  Apply Coupon
                </button>

                <p className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>EGP {totalPrice.toLocaleString()}</span>
                </p>
                {discountAmount > 0 && (
                  <p className="d-flex justify-content-between text-success mb-2">
                    <span>Discount:</span>
                    <span>- EGP {discountAmount.toLocaleString()}</span>
                  </p>
                )}
                <p className="d-flex justify-content-between mb-3 fw-bold">
                  <span>Total:</span>
                  <span className="text-danger">EGP {finalPrice.toLocaleString()}</span>
                </p>

                <button
                  className="btn btn-outline-dark w-100 mb-2 fw-bold"
                  onClick={handleClear}
                >
                  🧹 Clear Cart
                </button>
                <button
                  className="btn btn-warning w-100 fw-bold text-uppercase"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>

          <div className="d-md-none fixed-bottom bg-white border-top p-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <strong>Total: EGP {finalPrice.toLocaleString()}</strong>
              <button
                className="btn btn-warning fw-bold"
                style={{ minWidth: 140 }}
                onClick={() => navigate('/checkout')}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
