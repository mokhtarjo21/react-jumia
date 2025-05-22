import PropTypes from "prop-types";
import React, { useRef, useState, useEffect } from "react";
import styles from "./products_browser.module.css";
import { Link } from "react-router-dom";
// for arrow icon
import { MdChevronRight } from "react-icons/md";
import { MdChevronLeft } from "react-icons/md";


const SCROLL_AMOUNT = 400; 
const ProductsBrowser = ({ title = "pass title, pass the filter like is_featured=true, best_seller=true," , navigateTo = "best-sellers", filter = ""}) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateArrows = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    updateArrows();
    const handleResize = () => updateArrows();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
    }
  };
  

  return (
    <div className={styles.container}>
     
        <button 
          className={`${styles.scrollButton} ${styles.scrollButtonLeft} ${!canScrollLeft ? styles.scrollButtonHidden : ''}`}
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          <MdChevronLeft size={24} />
        </button>
        <button 
          className={`${styles.scrollButton} ${styles.scrollButtonRight} ${!canScrollRight ? styles.scrollButtonHidden : ''}`}
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          <MdChevronRight size={24} />
        </button>
      <div className={styles.scrollContainer} ref={scrollRef} onScroll={updateArrows}>

        {/* images here */}


      </div>
    </div>
  );
};

ProductsBrowser.propTypes = {
  title: PropTypes.string,
};

export default ProductsBrowser;
