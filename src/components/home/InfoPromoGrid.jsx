// src/components/home/InfoPromoGrid.jsx
import React from "react";
import { FaUserTie, FaStore, FaShieldAlt } from "react-icons/fa";

const promos = [
  { icon: <FaUserTie size={22} />, title: "Join Jumia", subtitle: "As a Sales Consultant" },
  { icon: <FaStore size={22} />, title: "Sell on Jumia", subtitle: "Grow Your Business" },
  { icon: <FaShieldAlt size={22} />, title: "Warranty", subtitle: "On Your Purchases" },
];

const InfoPromoGrid = () => {
  return (
    <div className="row g-3 mt-3">
      {promos.map((promo, i) => (
        <div key={i} className="col-12 col-md-4">
          <div className="bg-white d-flex align-items-center gap-3 p-3 rounded shadow-sm h-100">
            <div className="bg-warning rounded-circle p-3 text-white d-flex align-items-center justify-content-center">
              {promo.icon}
            </div>
            <div>
              <div className="fw-bold small">{promo.title}</div>
              <div className="text-muted small">{promo.subtitle}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoPromoGrid;
