// src/components/home/FlashSaleStrip.jsx
import React from "react";

const FlashSaleStrip = ({ products, onAddToCart }) => {
  return (
    <div className="bg-white p-3 rounded shadow-sm mt-4">
      <h5 className="fw-bold mb-3 text-danger">🔥 Flash Sale</h5>
      <div className="d-flex overflow-auto gap-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="card border-0 shadow-sm"
            style={{ minWidth: "180px", maxWidth: "180px" }}
          >
            <img
              src={product.image || "https://via.placeholder.com/180"}
              className="card-img-top"
              alt={product.name}
              style={{ height: "160px", objectFit: "cover" }}
            />
            <div className="card-body p-2">
              <div className="text-truncate fw-semibold" title={product.name}>
                {product.name}
              </div>
              <div className="text-danger fw-bold">EGP {product.price}</div>
              <button
                className="btn btn-sm btn-outline-primary mt-2 w-100"
                onClick={() => onAddToCart(product.id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSaleStrip;