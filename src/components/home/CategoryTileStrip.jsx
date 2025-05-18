import React from "react";
import { FaClock, FaStar, FaEye } from "react-icons/fa";

const categories = [
  { icon: <FaClock size={20} />, label: "New Arrivals", bg: "#eaf4ff" },
  { icon: <FaStar size={20} />, label: "Top Deals", bg: "#eaffea" },
  { icon: <FaEye size={20} />, label: "Recently Viewed", bg: "#f5f5f5" },
];

const CategoryTileStrip = () => {
  return (
    <div className="bg-white p-3 rounded shadow-sm my-4">
      <div className="d-flex flex-wrap justify-content-start gap-3">
        {categories.map((item, index) => (
          <div
            key={index}
            className="d-flex align-items-center gap-2 px-3 py-2 rounded shadow-sm"
            style={{
              backgroundColor: item.bg,
              minWidth: "180px",
              cursor: "pointer",
              transition: "0.3s ease all",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div className="text-primary">{item.icon}</div>
            <div className="fw-bold small">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryTileStrip;
