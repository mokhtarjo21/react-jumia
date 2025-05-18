import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaStar, FaHeart, FaFacebookF, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const ProductCard = ({info}) => {
  return (
    <div className="container my-4">
      <div className="card p-3 shadow-sm">
        <div className="row">
          {/* Product Image and Thumbnails */}
          <div className="col-md-5 text-center">
            <img
              src={`http://localhost:8000${info.product_images[0].image}`}
              alt={info.product_images[0].alt_text || 'Product Image'}
              className="img-fluid rounded"
            />
            <div className="d-flex justify-content-center mt-2">
              {info.product_images.slice(1, 5).map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:8000${image.image}`}
                  alt={image.alt_text || `Thumbnail ${index + 1}`}
                  className="img-thumbnail mx-1"
                  style={{ width: '60px', height: '60px' }}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="col-md-7">
            <h5>{info.name}</h5>
            <div className="mb-2">
              <span className="text-danger fs-5 fw-bold">EGP {info.sale_price ?info.sale_price:info.price}</span>
              {info.sale_price ?`<span className="text-muted text-decoration-line-through ms-2">EGP ${info.price}</span>`:''}
              <span className="text-white bg-warning px-2 ms-2 rounded">{Math.ceil(100-(info.sale_price/info.price*100)) || " "}%</span>
            </div>

            <div className="text-success small mb-1"> only {info.stock_quantity} left in stock</div>
            <div className="text-muted small mb-2">{info.category_name}</div>

            {/* Ratings */}
            <div className="mb-3 text-warning">
              {[...Array(info.rating_average)].map((_, i) => (
                <FaStar key={i} className="me-1" />
              ))}
              <span className="text-dark ms-2">({info.rating_count} verified ratings)</span>
            </div>

            {/* Sizes */}
            <div className="mb-3">
              <strong>Variation Available</strong>
              <div className="mt-2">
                {info.sizes.map(size => (
                  <button key={size} className="btn btn-outline-secondary btn-sm me-2">
                    {size.name}
                  </button>
                ))}
              </div>
              <div className="mt-2">
                {info.colors.map(size => (
                  <button key={size} className="btn btn-outline-secondary btn-sm me-2">
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <button className="btn btn-warning w-100 fw-bold">Add to cart</button>

            {/* Promotions */}
            {/* <div className="mt-4">
              <h6>PROMOTIONS</h6>
              <ul className="list-unstyled">
                <li>🚚 Enjoy free delivery on orders above 400 EGP.</li>
                <li>💳 Buy Now, Pay Later. Enjoy 0% Interest on Installments</li>
              </ul>
            </div> */}

            {/* Share */}
            {/* <div className="mt-3">
              <strong>SHARE THIS PRODUCT</strong>
              <div className="d-flex mt-2">
                <FaFacebookF className="me-3" />
                <FaTwitter className="me-3" />
                <FaWhatsapp />
              </div>
            </div> */}

            {/* Report */}
            {/* <div className="mt-3">
              <a href="#" className="text-decoration-underline small text-muted">
                Report incorrect product information
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
