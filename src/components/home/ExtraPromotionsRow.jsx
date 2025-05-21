import React from 'react';
import { FaFire, FaGift, FaTags, FaCoins, FaBookOpen, FaBolt, FaRocket } from 'react-icons/fa';

const promotions = [
  { icon: <FaFire />, label: 'Flash Sale' },
  { icon: <FaGift />, label: 'Deals of the Week' },
  { icon: <FaTags />, label: 'Extra Discounts' },
  { icon: <FaCoins />, label: 'Redeem Points' },
  { icon: <FaBookOpen />, label: 'Catalogue' },
  { icon: <FaBolt />, label: 'Installments' },
  { icon: <FaRocket />, label: 'Jumia Force' },
];

const ExtraPromotionsRow = () => {
  return (
    <div
      className="d-flex flex-wrap justify-content-between align-items-center text-center shadow-sm rounded"
      style={{
        backgroundColor: "#ffffff",
        padding: "20px",
        marginBottom: "20px",
        borderRadius: "10px",
      }}
    >
      {promotions.map((item, index) => (
        <div
          key={index}
          className="d-flex flex-column align-items-center justify-content-center shadow-sm"
          style={{
            width: "100px",
            padding: "12px",
            margin: "10px",
            backgroundColor: "#f9f9f9",
            borderRadius: "12px",
            transition: "transform 0.2s",
          }}
        >
          <div style={{ fontSize: "24px", color: "#f5a623", marginBottom: "6px" }}>
            {item.icon}
          </div>
          <small style={{ fontSize: "13px", color: "#333" }}>{item.label}</small>
        </div>
      ))}
    </div>
  );
};

export default ExtraPromotionsRow;
