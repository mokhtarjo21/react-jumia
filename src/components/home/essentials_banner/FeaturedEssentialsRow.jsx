import React from "react";
import { Link } from "react-router-dom";
import "./FeaturedEssentialsRow.css";

// Import category images
import anniversaryImg from "../../../assets/category_images/anniversary.png";
import kitchenDiningImg from "../../../assets/category_images/S-CATsKitchenDining.png";
import smallAppliancesImg from "../../../assets/category_images/smallappen.png";
import laptopsImg from "../../../assets/category_images/CAT-laptops.png";
import babyImg from "../../../assets/category_images/CAT-baby.png";
import appliancesImg from "../../../assets/category_images/CAT-Appliances.png";
import supermarketImg from "../../../assets/category_images/c.png";
import kitchenImg from "../../../assets/category_images/CAT-Kitchen.png";
import tvImg from "../../../assets/category_images/CAT-tv.png";
import phonesImg from "../../../assets/category_images/CATsPhones.png";
import freelinkImg from "../../../assets/category_images/Freelink1.gif";
import fashionImg from "../../../assets/category_images/CAT-Fashion.png";

const essentials = [
  { img: anniversaryImg, title: "Jumia Anniversary", link: "/" },
  { img: phonesImg, title: "Phones & Accessories", link: "/" },
  { img: fashionImg, title: "Fashion", link: "/" },
  { img: smallAppliancesImg, title: "Small Appliances", link: "/" },
  { img: freelinkImg, title: "Beauty Essentials", link: "/" },
  { img: kitchenDiningImg, title: "Home & Decor", link: "/" },
  { img: babyImg, title: "Baby Products", link: "/" },
  { img: appliancesImg, title: "Large Appliances", link: "/" },
  { img: supermarketImg, title: "Supermarket", link: "/" },
  { img: laptopsImg, title: "Computing", link: "/" },
  { img: tvImg, title: "Televisions", link: "/" },
  { img: kitchenImg, title: "Kitchen Essentials", link: "/" },
];

const FeaturedEssentialsRow = () => {
  return (
    <div className="bg-white p-3 rounded shadow-sm my-4">
      <h5 className="mb-4 text-center fw-bold">All Your Essentials in One Place</h5>
      <div className="row g-3">
        {essentials.map((item, idx) => (
          <div key={idx} className="col-2 text-center">
            <Link to={item.link} className="category-link">
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
              <div className="fw-bold small category-title">{item.title}</div>
              {item.subtitle && <div className="text-muted small">{item.subtitle}</div>}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedEssentialsRow;
