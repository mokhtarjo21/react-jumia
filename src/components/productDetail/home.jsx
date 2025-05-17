import React from 'react';
import ImageGallery from './ImageGallery';
import ProductInfo from './ProductInfo';
import Specifications from './Specifications';
import KeyFeatures from './KeyFeatures';
import CustomerReviews from './CustomerReviews';
import RelatedProducts from './RelatedProducts';

const ProductPage = () => {
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6">
          <ImageGallery />
        </div>
        <div className="col-md-6">
          <ProductInfo />
        </div>
      </div>
      <Specifications />
      <KeyFeatures />
      <CustomerReviews />
      <RelatedProducts />
    </div>
  );
};

export default ProductPage;
