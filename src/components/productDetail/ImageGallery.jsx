import React from 'react';
import { Carousel } from 'react-bootstrap';

const ImageGallery = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src="https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/75/545973/1.jpg" alt="Product" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/75/545973/2.jpg" alt="Product alt" />
      </Carousel.Item>
    </Carousel>
  );
};

export default ImageGallery;
