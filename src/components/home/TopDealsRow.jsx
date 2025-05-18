// src/components/home/TopDealsRow.jsx
import React, { useEffect, useState } from "react";
import { instance } from "../../axiosInstance/instance";

const TopDealsRow = () => {
  const [topDeals, setTopDeals] = useState([]);

  useEffect(() => {
    instance
      .get("api/category/home/products/")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setTopDeals(res.data);
        } else {
          console.warn("Unexpected top deals structure:", res.data);
          setTopDeals([]);
        }
      })
      .catch((err) => {
        console.error("Top deals fetch error:", err);
        setTopDeals([]);
      });
  }, []);

  return (
    <div className="bg-white p-3 rounded shadow-sm mt-4">
      <h5 className="fw-bold mb-3">💸 Top Deals</h5>
      <div className="d-flex overflow-auto gap-3">
        {topDeals.map((product) => (
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

export default TopDealsRow;
