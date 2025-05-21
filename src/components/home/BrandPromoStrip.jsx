import React from "react";

const promos = [
  {
    img: "/images/defacto-banner.jpg",
    alt: "DeFacto Offer",
    link: "#",
  },
  {
    img: "/images/loreal-banner.jpg",
    alt: "L'Oréal Offer",
    link: "#",
  },
];

const BrandPromoStrip = () => {
  return (
    <div className="bg-white p-3 rounded shadow-sm my-4">
      <h5 className="mb-3 text-center fw-bold">Shop & Save On Offers!</h5>
      <div className="row g-3">
        {promos.map((promo, idx) => (
          <div key={idx} className="col-12 col-md-6">
            <a href={promo.link}>
              <img
                src={promo.img}
                alt={promo.alt}
                className="img-fluid rounded shadow-sm w-100 hover-zoom"
                style={{ transition: "transform 0.3s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandPromoStrip;
