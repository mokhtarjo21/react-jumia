import ImageGallery from './ImageGallery';
import ProductInfo from './ProductInfo';
import KeyFeatures from './KeyFeatures';

import CustomerReviews from './CustomerReviews';
import RelatedProducts from './RelatedProducts';
import { useParams } from 'react-router-dom';
import { useEffect ,useState} from 'react';
import { instance } from '../../axiosInstance/instance';
const ProductDetailHome = () => {
 
  const path = location.pathname;
  const id = path.split('/').pop(); // Extract the product ID from the URL
  console.log("Product ID:", id); // Log the product ID for debugging
  const [product , setProduct] = useState(null);
  useEffect(() => {
    const fetchProductDetails = async () => {
      const response= await instance.get(`/api/products/${id}/`);
      console.log(response.data);
      setProduct(response.data);
    }
    fetchProductDetails();

  }
  , []);
   if (!product) return <p>Loading product details...</p>;
  return (
    <div className="container my-4">
      {/* Top Section: Image + Info */}
      <div className="row">
       
          <ImageGallery  info={product}/>
          <KeyFeatures info={product} />
        
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
          <RelatedProducts category ={product.category_slug}/>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailHome;