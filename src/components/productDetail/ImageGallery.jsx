import React, { useState, useRef } from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { FaStar } from "react-icons/fa";
import { toast } from 'react-toastify';
import { addToCart as addToCartCookie, getCartFromCookies } from '../../utils/cartCookie';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';

const ProductCard = ({ info }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const mainImageRef = useRef();
  const dispatch = useDispatch();

  const handleImage = (src) => {
    if (mainImageRef.current) {
      mainImageRef.current.src = src;
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    // Add to cookie
    addToCartCookie(info, 1, selectedColor, selectedSize);
    
    // Add to Redux store
    const productSummary = {
      id: info.id,
      name: info.name,
      price: info.sale_price || info.price,
      image: info.product_images?.find(img => img.is_primary)?.image || 
             info.product_images?.[0]?.image || null,
    };
    
    dispatch(addToCart({
      product: productSummary,
      quantity: 1,
      color: selectedColor,
      size: selectedSize
    }));
    
    try {
      const currentCart = getCartFromCookies();
      console.log("Cart now:", currentCart);
    } catch (err) {
      console.error("Cookie parse error:", err);
    }

    toast.success("Added to cart!");
  };

  return (
    <div className="container my-4">
      <div className="card p-3 shadow-sm">
        <div className="row">
          {/* Product Image and Thumbnails */}
          <div className="col-md-5 text-center">
            {info.product_images?.length > 0 ? (
              <>
                <img
                  ref={mainImageRef}
                  src={`http://localhost:8000${info.product_images[0].image}`}
                  alt={info.product_images[0].alt_text || 'Product Image'}
                  className="img-fluid rounded"
                   style={{ width: '100%', height: '400px', cursor: 'pointer' }}
                />
                <div className="d-flex justify-content-center mt-2">
                  {info.product_images.map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:8000${image.image}`}
                      alt={image.alt_text || `Thumbnail ${index + 1}`}
                      className="img-thumbnail mx-1"
                      onClick={(e) => handleImage(e.target.src)}
                      style={{ width: '60px', height: '60px', cursor: 'pointer' }}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-muted">No images available</div>
            )}
          </div>

          {/* Product Details */}
          <div className="col-md-7">
            <h5>{info.name}</h5>
            <div className="mb-2">
              <span className="text-danger fs-5 fw-bold">
                EGP {info.sale_price ? info.sale_price : info.price}
              </span>
              {info.sale_price && (
                <>
                  <span className="text-muted text-decoration-line-through ms-2">
                    EGP {info.price}
                  </span>
                  <Badge bg="danger" className="ms-2">
                    {Math.ceil(100 - (info.sale_price / info.price) * 100)}% Off
                  </Badge>
                </>
              )}
            </div>

            <div className="text-success small mb-1">
              Only {info.stock_quantity} left in stock
            </div>
            <div className="text-muted small mb-2">{info.category_name}</div>

            {/* Ratings */}
            <div className="mb-3 text-warning">
              {[...Array(Math.floor(info.rating_average))].map((_, i) => (
                <FaStar key={i} className="me-1" />
              ))}
              <span className="text-dark ms-2">
                ({info.rating_count} verified ratings)
              </span>
            </div>

            {/* Sizes */}
            {info.sizes?.length > 0 && (
              <div className="mb-3">
                <p>Size Available</p>
                <div className="mt-2">
                  {info.sizes.map(size => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size.name)}
                      className={`btn btn-sm me-2 ${selectedSize === size.name ? 'btn-dark text-white' : 'btn-outline-secondary'}`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {info.colors?.length > 0 && (
              <div className="mb-3">
                <p>Colors Available</p>
                <div className="mt-2">
                  {info.colors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`btn btn-sm me-2 ${selectedColor === color.name ? 'btn-dark text-white' : 'btn-outline-secondary'}`}
                    >
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Selected Info */}
            <div className="mt-2">
              <small className="text-muted">
                Selected Size: {selectedSize || "None"}, Color: {selectedColor || "None"}
              </small>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="btn btn-warning w-100 fw-bold mt-3"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
