import React from "react";
import { useSelector } from "react-redux";
import "./favoriteProductsSection.css"; 

const FavoriteProductsSection = () => {
  const favoriteProducts = useSelector((state) => state.favorites.items);

  return (
    <div className="container mt-4">
      <h3 className="bi bi-heart-fill me-2 menu-icon" style={{ color: "#f68b1e", fontWeight: "bold" }}>
        Your Favourite Products
      </h3>

      {favoriteProducts.length === 0 ? (
        <p>You have no favorite products yet.</p>
      ) : (
        <div className="row">
          {favoriteProducts.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteProductsSection;
