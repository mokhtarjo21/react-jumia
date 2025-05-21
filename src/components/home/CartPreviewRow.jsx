import React, { useEffect, useState } from "react";
import { instance } from "../../axiosInstance/instance";

const CartPreviewRow = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    instance
      .get("api/cart/")
      .then((res) => {
        setCartItems(res.data); // Ensure this matches your backend structure
      })
      .catch((err) => {
        console.error("Failed to load cart:", err);
      });
  }, []);

  if (!cartItems.length) return null;

  return (
    <div className="bg-white p-3 rounded shadow-sm my-4">
      <h5 className="mb-3 text-center fw-bold">Your Cart Items</h5>
      <div className="row g-3">
        {cartItems.map((item, idx) => (
          <div key={idx} className="col-6 col-md-3 col-lg-2 text-center">
            <div className="bg-light rounded shadow-sm p-2 h-100">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="img-fluid mb-2"
                style={{ height: "100px", objectFit: "contain" }}
              />
              <div className="fw-bold small">{item.product.name}</div>
              <div className="text-danger small">EGP {item.product.price}</div>
              <div className="text-muted small">Qty: {item.quantity}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPreviewRow;
