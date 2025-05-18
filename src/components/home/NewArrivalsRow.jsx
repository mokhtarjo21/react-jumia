// src/components/home/NewArrivalsRow.jsx
import React, { useEffect, useState } from "react";
import { instance } from "../../axiosInstance/instance";

const NewArrivalsRow = () => {
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    instance
      .get("api/category/fashion/products/")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setNewProducts(res.data);
        } else {
          console.warn("Unexpected new arrivals structure:", res.data);
          setNewProducts([]);
        }
      })
      .catch((err) => {
        console.error("New arrivals fetch error:", err);
        setNewProducts([]);
      });
  }, []);

  return (
    <div className="bg-white p-3 rounded shadow-sm mt-4">
      <h5 className="fw-bold mb-3">🆕 New Arrivals</h5>
      <div className="d-flex overflow-auto gap-3">
        {newProducts.map((product) => (
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

export default NewArrivalsRow;
