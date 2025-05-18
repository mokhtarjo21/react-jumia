// src/components/home/CarouselBanner.jsx
import React from "react";
import { Carousel } from "react-bootstrap";

const CarouselBanner = () => {
  const banners = [
    { id: 1, src: "https://via.placeholder.com/900x350?text=Banner+1" },
    { id: 2, src: "https://via.placeholder.com/900x350?text=Banner+2" },
    { id: 3, src: "https://via.placeholder.com/900x350?text=Banner+3" },
  ];

  return (
    <Carousel fade interval={3000} pause={false}>
      {banners.map((banner) => (
        <Carousel.Item key={banner.id}>
          <img
            className="d-block w-100 rounded"
            src={banner.src}
            alt={`Slide ${banner.id}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselBanner;
