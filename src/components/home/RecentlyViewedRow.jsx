 // src/components/home/RecentlyViewedRow.jsx
import React, { useEffect, useState } from "react";
import { instance } from "../../axiosInstance/instance";

const RecentlyViewedRow = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    // This should be replaced with actual logic (e.g., user token, local storage)
    instance
      .get("api/category/books/products/")
      .then((res) => setRecentProducts(res.data))
      .catch((err) => console.error("Recently viewed fetch error:", err));
  }, []);

  return (
    <div className="bg-white p-3 rounded shadow-sm mt-4">
      <h5 className="fw-bold mb-3">👀 Recently Viewed</h5>
      <div className="d-flex overflow-auto gap-3">
        {recentProducts.map((product) => (
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewedRow;