// src/components/home/ProductGrid.jsx
import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="text-warning small">
      {[...Array(fullStars)].map((_, i) => <FaStar key={f-${i}} />)}
      {halfStar && <FaStarHalfAlt key="half" />}
      {[...Array(emptyStars)].map((_, i) => <FaRegStar key={e-${i}} />)}
    </div>
  );
};

const ProductGrid = ({ products = [], onAddToCart }) => {
  return (
    <div className="row g-3">
      {products.map((product) => (
        <div key={product.id} className="col-6 col-md-4 col-lg-3">
          <div className="card h-100 border-0 shadow-sm">
            <img
              src={product.image || "https://via.placeholder.com/300"}
              className="card-img-top"
              alt={product.name}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body p-2 d-flex flex-column justify-content-between">
              <div className="text-truncate fw-semibold" title={product.name}>
                {product.name}
              </div>
              {renderStars(product.rating || 0)}
              <div className="text-danger fw-bold mb-1">EGP {product.price}</div>
              <div className={small ${product.in_stock ? "text-success" : "text-danger"}}>
                {product.in_stock ? "In Stock" : "Out of Stock"}
              </div>
              {onAddToCart && product.in_stock && (
                <button
                  className="btn btn-sm btn-outline-primary w-100 mt-2"
                  onClick={() => onAddToCart(product.id)}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;