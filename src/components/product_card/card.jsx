import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { FaStar, FaRegStar, FaHeart } from "react-icons/fa";
import { addFavorite, removeFavorite } from "../../store/favoritesSlice";
import "./card.css";
// Import the Jumia Express logo
import jexpressLogo from "../../assets/jexpress-logo.png";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.some(item => item.id === product.id);
  console.log(favorites);

  // Get the primary image or fallback
  const primaryImage = product.product_images?.find(img => img.is_primary) || product.product_images?.[0];
  const imageUrl = primaryImage?.image
    ? `http://127.0.0.1:8000${primaryImage.image}`
    : "https://via.placeholder.com/150";

  // Calculate discount
  const discount =
    product.sale_price && product.price
      ? Math.round(
          ((parseFloat(product.price) - parseFloat(product.sale_price)) / parseFloat(product.price)) * 100)
      : null;

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(product.id));
    } else {
      dispatch(addFavorite(product));
    }
  };

  const handleCardClick = (e) => {
    // Prevent click if clicking on favorite button or add to cart button
    if (e.target.closest('.position-absolute') || e.target.closest('.add-to-cart-btn')) {
      return;
    }
    navigate(`/product/${product.id}`);
  };

  // Render stars
  const renderStars = (rating) => {
    const stars = [];
    const rounded = Math.round(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rounded ? (
          <FaStar key={i} color="#FFA41C" />
        ) : (
          <FaRegStar key={i} color="#FFA41C" />
        )
      );
    }
    return stars;
  };

  

  return (
    <Card 
      className="product-card shadow-sm" 
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      {/* low stocks Badge */}
      {product.stock_quantity < 50 && (
      <Badge
        className="low-stocks-badge"
      >
        only {product.stock_quantity} left in stock
      </Badge>
      )}

      {/* Favorite Button */}
      <div 
        className="position-absolute"
        style={{ top: 170, right: 10, cursor: "pointer", zIndex: 2 }}
        onClick={handleFavoriteClick}
      >
        <FaHeart size={24} color={isFavorite ? "#ff4d4f" : "#ccc"} />
      </div>

      {/* Product Image */}
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={primaryImage?.alt_text || product.name}
        className="product-card-img"
      />

      <Card.Body>
        <Card.Title className="mb-1" style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3 }}>
          {product.name}
        </Card.Title>
        <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>{product.brand_name}</div>

        {/* Price Section */}
        <div className="fw-bold mb-1" style={{ fontSize: 18, color: "#222" }}>
          EGP {product.sale_price || product.price}
        </div>
        
        {product.sale_price && (
          <div className="d-flex align-items-center mb-2">
            <span
              style={{
                textDecoration: "line-through",
                color: "#888",
                fontSize: 14,
                marginRight: 8,
              }}
            >
              EGP {product.price}
            </span>
            
            <Badge className="discount-badge" text="dark" >
              -{discount}%
            </Badge>
          </div>
        )}

        {/* Rating */}
        <div className="d-flex align-items-center mb-2">
          {renderStars(product.rating_average)}
          <span style={{ fontSize: 13, color: "#888", marginLeft: 6 }}>
            ({product.rating_count})
          </span>
        </div>
      </Card.Body>

      {/* Jumia Express Badge */}
      {product.is_featured && (
        <div className="jumia-express-badge">
          <span className="Jumia-express">
            <img className="jumia-express-logo" src={jexpressLogo} alt="Jumia Express" />
          </span>
        </div>
      )}

      <Button
        variant="warning"
        className="add-to-cart-btn"
      >
        Add to cart
      </Button>
    </Card>
  );
}

export default ProductCard;