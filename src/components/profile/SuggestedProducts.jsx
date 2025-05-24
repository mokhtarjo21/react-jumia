
import React, { useEffect, useState } from "react";
import { instance } from "../../axiosInstance/instance";

const RecommendedRow = () => {
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    instance
      .get("api/category/electronics/products/")
      .then((res) => {
        if (Array.isArray(res.data.products)) {
          setRecommended(res.data.products);
        } else {
          console.warn("Unexpected recommended structure:", res.data);
        }
      })
      .catch((err) => console.error("Recommended fetch error:", err));
  }, []);

  return (
    <div className="product-section mt-4">
      <h3>🎯 Recommended For You</h3>
      <div className="products-row">
        {recommended.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image || "https://via.placeholder.com/150"}
              alt={product.name}
              style={{ height: "130px", objectFit: "cover" }}
            />
            <p title={product.name} className="text-truncate">
              {product.name}
            </p>
            <p className="price">EGP {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedRow;
