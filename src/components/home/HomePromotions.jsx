// src/components/home/HomePromotions.jsx
import React from "react";

const HomePromotions = () => {
  return (
    <div className="row g-3">
      <div className="col-md-6">
        <img
          src="https://via.placeholder.com/900x350?text=Super+Sale+1"
          alt="Promo Banner 1"
          className="img-fluid rounded shadow-sm"
        />
      </div>
      <div className="col-md-6">
        <img
          src="https://via.placeholder.com/900x350?text=Mega+Deals+2"
          alt="Promo Banner 2"
          className="img-fluid rounded shadow-sm"
        />
      </div>
    </div>
  );
};

export default HomePromotions;