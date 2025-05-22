import React from "react";
import "./FeaturedEssentialsRow.css";

const essentials = [
  { img: "/images/anniversary.png", title: "Jumia Anniversary" },
  { img: "/images/phones.png", title: "Phones & Accessories"  },
  { img: "/images/fashion.png", title: "Fashion"   },
  { img: "/images/appliances.png", title: "Small Appliances" },
  { img: "/images/beauty.png", title: "Beauty Essentials"  },
  { img: "/images/home.png", title: "Home & Decor"   },
  { img: "/images/baby.png", title: "Baby Products"  },
  { img: "/images/fridge.png", title: "Large Appliances"  },
  { img: "/images/supermarket.png", title: "Supermarket"  },
  { img: "/images/laptop.png", title: "Computing" },
  { img: "/images/tv.png", title: "Televisions" },
  { img: "/images/kitchen.png", title: "Kitchen Essentials" },
];

const FeaturedEssentialsRow = () => {
  return (
    <div className="bg-white p-3 rounded shadow-sm my-4">
      <h5 className="mb-4 text-center fw-bold">All Your Essentials in One Place</h5>
      <div className="row g-3">
        {essentials.map((item, idx) => (
          <div key={idx} className="col-6 col-md-3 col-lg-2 text-center">
            <div
              className="bg-light rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center hover-zoom"
              style={{
                width: "100px",
                height: "100px",
                overflow: "hidden",
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="img-fluid"
                style={{ maxHeight: "90%", maxWidth: "90%" }}
              />
            </div>
            <div className="fw-bold small">{item.title}</div>
            <div className="text-muted small">{item.subtitle}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedEssentialsRow;
