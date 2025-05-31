import ImageGallery from './ImageGallery';
import ProductInfo from './ProductInfo';
import KeyFeatures from './KeyFeatures';

import CustomerReviews from './CustomerReviews';
import ProductsBrowser from "../products_browser/products_browser";
import { useEffect, useState } from 'react';
import { instance } from '../../axiosInstance/instance';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProductDetailHome = () => {
  // Use useParams hook to get the ID from the URL
  const { product_id } = useParams();
  // Also track location changes
  const location = useLocation();
  
  // Simple authentication check - just a boolean and token
  const { isLoggedIn } = useSelector((state) => state.user);
  const accessToken = isLoggedIn ? localStorage.getItem('access') : null;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      
      console.log("Fetching product with ID:", product_id);
      console.log("User authentication status:", { isLoggedIn, hasToken: !!accessToken });
      
      try {
        // Configure request options based on authentication status
        const requestConfig = {};
        
        // If user is authenticated, include the Authorization header
        if (isLoggedIn && accessToken) {
          requestConfig.headers = {
            'Authorization': `Bearer ${accessToken}`
          };
          console.log("Adding auth token to request");
        }
        
        // Make the API request with or without auth headers
        const response = await instance.get(`/api/products/${product_id}/`, requestConfig);
        
        console.log("product_id", product_id);    
        console.log("API Response:", response);
        
        if (response.data) {
          setProduct(response.data);
        } else {
          setError("No product data received");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(`Failed to load product: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    if (product_id) {
      fetchProductDetails();
    }
  }, [product_id, location.pathname, isLoggedIn, accessToken]); 
  
  if (loading) return <p>Loading product data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>No product found</p>;
  
  return (
    <div className="container my-4">
      {/* Top Section: Image + Info */}
      <div className="row">
        <ImageGallery info={product} />
        <KeyFeatures info={product} isAuthenticated={isLoggedIn} accessToken={accessToken} />
      </div>
      
      {/* Reviews */}
      <div className="row mt-4">
        <div className="col-md-12">
          <CustomerReviews info={product} />
        </div>
      </div>

      {/* Related Products */}
      <div className="row mt-5">
        <div className="col-12">
          <ProductsBrowser title="Related Products" filter="best_seller=true" navigateTo="best-sellers"/>
        </div>
      </div>
      {/* recently viewed */}
      <div className="row mt-5">
        <div className="col-12">
          <ProductsBrowser title="recently viewed" filter="" recentlyViewed={true}/>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailHome;