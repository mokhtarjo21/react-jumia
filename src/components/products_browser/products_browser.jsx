import ProductCard from "./product_card_small/card_small";
import PropTypes from "prop-types";
import React, { useRef, useState, useEffect } from "react";
import styles from "./products_browser.module.css";
import { Link } from "react-router-dom";
// for arrow icon
import { MdChevronRight } from "react-icons/md";
import { MdChevronLeft } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { instance } from '../../axiosInstance/instance';
import { useSelector } from 'react-redux';

const SCROLL_AMOUNT = 400; // Increased scroll amount for smoother scrolling

const ProductsBrowser = ({ title = "pass title, pass the filter like is_featured=true, best_seller=true," , navigateTo = "", filter = "", recentlyViewed = false}) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get authentication state from Redux store
  const { isLoggedIn } = useSelector((state) => state.user);
  const accessToken = isLoggedIn ? localStorage.getItem('access') : null;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Configure request options based on authentication status
        const requestConfig = {};
        
        // If user is authenticated, include the Authorization header
        if (isLoggedIn && accessToken) {
          requestConfig.headers = {
            'Authorization': `Bearer ${accessToken}`
          };
        }
        
        let response;
        if(recentlyViewed) {
          // Use instance.get instead of fetch for recently viewed products
          response = await instance.get('/api/products/recently-viewed/', requestConfig);
        } else {
          // Use instance.get instead of fetch for filtered products
          response = await instance.get(`/api/products/?${filter}`, requestConfig);
        }
        
        console.log("API Response:", response);
        
        // Extract data directly from the response (axios already parses JSON)
        const data = response.data;
        
        // Check if products property exists in the response
        if (data) {
          if(data.products && Array.isArray(data.products)){
            setProducts(data.products);
          } else if (data.results && Array.isArray(data.results)) {
            setProducts(data.results);
          } else {
            console.error("Unexpected response format:", data);
            setProducts([]);
          }
        } else {
          console.error("No data received from API");
          setProducts([]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message || 'Failed to fetch products');
        setProducts([]);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filter, recentlyViewed, isLoggedIn, accessToken]);

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

  if (loading) return (
    <div className={styles.loadingContainer}>
      Loading products...
    </div>
  );
  
  if (error) return (
    <div className={styles.errorContainer}>
      Error: {error}
    </div>
  );

  // If products is undefined or not an array, show empty state
  if (!products || !Array.isArray(products) || products.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.header}>{title}</h2>
        <div className={styles.emptyContainer}>
          No products found, please check api settings in react products browsercomponents
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>{title}</h2>
      {navigateTo && (
        <Link 
          className={styles.showAllButton}
          to={`/${navigateTo}`}
        >
          Show All <MdChevronRight size={18} />
        </Link>
      )}
      
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

        <div className={styles.cardsWrapper}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

ProductsBrowser.propTypes = {
  title: PropTypes.string,
};

export default ProductsBrowser;
