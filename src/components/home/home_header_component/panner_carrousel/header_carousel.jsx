import React, { useState, useEffect } from 'react';
import styles from './header_carousel.module.css';

// Import all images from the assets folder
import image1 from '../../../../assets/header_carrousel/712X384ENG (1).jpg';
import image2 from '../../../../assets/header_carrousel/3.gif';
import image3 from '../../../../assets/header_carrousel/712X384ENG.jpg';
import image4 from '../../../../assets/header_carrousel/712x384EN (1).jpg';
import image5 from '../../../../assets/header_carrousel/SL712X384ENG-1.gif';
import image6 from '../../../../assets/header_carrousel/712X384ENG (1).png';
import image7 from '../../../../assets/header_carrousel/712X384ENG.png';
import image8 from '../../../../assets/header_carrousel/712x384EN.jpg';

const HeaderCarousel = () => {
  const images = [image1, image2, image3, image4, image5, image6, image7, image8];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  // Manual navigation
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carousel}>
        {/* Previous button */}
        <button className={`${styles.navButton} ${styles.prevButton}`} onClick={goToPrevious}>
          &#10094;
        </button>

        {/* Images */}
        <div className={styles.slideContainer}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
            >
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>

        {/* Next button */}
        <button className={`${styles.navButton} ${styles.nextButton}`} onClick={goToNext}>
          &#10095;
        </button>
      </div>

      {/* Dots/indicators */}
      <div className={styles.dotsContainer}>
        {images.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeaderCarousel; 