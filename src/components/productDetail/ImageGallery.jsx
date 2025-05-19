import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaStar } from 'react-icons/fa';

const ProductCard = ({ info }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

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
              <span className="text-danger fs-5 fw-bold">
                EGP {info.sale_price ? info.sale_price : info.price}
              </span>
              {info.sale_price ? (
                <span className="text-muted text-decoration-line-through ms-2">
                  EGP {info.price}
                </span>
              ) : null}
              <span className="text-white bg-warning px-2 ms-2 rounded">
                {info.sale_price ? Math.ceil(100 - (info.sale_price / info.price) * 100) : " "}{info.sale_price ? '% Off' : null}
              </span>
            </div>

            <div className="text-success small mb-1">
              Only {info.stock_quantity} left in stock
            </div>
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
              {info.sizes?.length > 0 && <p>Size Available</p>}
              <div className="mt-2">
                {info.sizes.map(size => (
                  <button
                    key={size.name}
                    value={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    className={`btn btn-sm me-2 ${selectedSize === size.name ? 'btn-dark text-white' : 'btn-outline-secondary'}`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="mb-3">
              {info.colors?.length > 0 && <p>Colors Available</p>}
              <div className="mt-2">
                {info.colors.map(color => (
                  <button
                    key={color.name}
                    value={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`btn btn-sm me-2 ${selectedColor === color.name ? 'btn-dark text-white' : 'btn-outline-secondary'}`}
                  >
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Info (Optional) */}
            <div className="mt-2">
              <small className="text-muted">
                Selected Size: {selectedSize || "None"}, Color: {selectedColor || "None"}
              </small>
            </div>

            {/* Add to Cart */}
            <button className="btn btn-warning w-100 fw-bold mt-3">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
