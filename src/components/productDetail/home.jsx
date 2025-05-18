import ImageGallery from './ImageGallery';
import ProductInfo from './ProductInfo';
import KeyFeatures from './KeyFeatures';
import Specifications from './Specifications';
import CustomerReviews from './CustomerReviews';
import RelatedProducts from './RelatedProducts';

const ProductDetailHome = () => {
  return (
    <div className="container my-4">
      {/* Top Section: Image + Info */}
      <div className="row">
        <div className="col-md-6">
          <ImageGallery />
        </div>
        <div className="col-md-6">
          <ProductInfo />
        </div>
      </div>

      {/* Key Features & Specs */}
      <div className="row mt-4">
        <div className="col-md-8">
          <KeyFeatures />
          <Specifications />
        </div>
      </div>

      {/* Reviews */}
      <div className="row mt-4">
        <div className="col-md-8">
          <CustomerReviews />
        </div>
      </div>

      {/* Related Products */}
      <div className="row mt-5">
        <div className="col-12">
          <RelatedProducts />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailHome;