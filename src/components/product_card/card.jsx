import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { FaStar, FaRegStar, FaHeart } from "react-icons/fa";
import "./card.css";

function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Get the primary image or fallback
  const primaryImage = product.product_images?.find(img => img.is_primary) || product.product_images?.[0];
  const imageUrl = primaryImage?.image
    ? `http://127.0.0.1:8000${primaryImage.image}`
    : "https://via.placeholder.com/150";

  // Calculate discount
  const discount =
    product.sale_price && product.price
      ? Math.round(
          ((parseFloat(product.price) - parseFloat(product.sale_price)) / parseFloat(product.price))*100)
      : null;

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

//   jumia express svg
{/* <svg aria-label="Express Shipping" viewBox="0 0 114 12" class="ic xprss" width="94" height="10">
  <use xlink:href="https://www.jumia.com.eg/assets_he/images/i-shop-jumia.9dea3b69.svg#express"></use>
</svg> */}

  return (
    <Card className="product-card shadow-sm ">
      {/* Free Shipping Badge */}
      {product.is_featured && (
        <Badge
          bg="warning"
          className="position-absolute"
          style={{ top: 10, left: 10, zIndex: 2, fontSize: 12 }}
        >
          Free Shipping*
        </Badge>
      )}

      {/* Favorite Button */}
      <Button
        variant="light"
        className="position-absolute p-2"
        style={{ top: 10, right: 10, borderRadius: "50%" }}
        onClick={() => setIsFavorite((f) => !f)}
      >
        <FaHeart color={isFavorite ? "#ff4d4f" : "#ccc"} />
      </Button>

      {/* Product Image */}
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={primaryImage?.alt_text || product.name}
        className="product-card-img"
      />

      <Card.Body style={{ paddingBottom: 48 }}>
        <Card.Title style={{ fontSize: 16, fontWeight: 500 }}>
          {product.name}
        </Card.Title>
        <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>{product.brand_name}</div>

        {/* Price Section */}
        <div style={{ fontWeight: 700, fontSize: 18, color: "#222" }}>
          {product.sale_price ? (
            <>
              EGP {product.sale_price} {"-"} EGP {product.price}
              
            </>
          ) : (
            <>EGP {product.price}</>
          )}
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
            <Badge bg="warning" text="dark" style={{ fontSize: 12 }}>
              -{discount}%
            </Badge>
          </div>
        )}

        {/* Rating */}
        <div className="d-flex align-items-center mb-2">
          {renderStars(product.rating_average)}
          <span style={{ fontSize: 15, color: "#888", marginLeft: 6 }}>
            ({product.rating_count})
          </span>
        </div>
      </Card.Body>

      {/* Add to Cart Button (only on hover) */}
      <Button
        variant="warning"
        className="add-to-cart-btn w-100"
        style={{
          color: "#fff",
          fontWeight: 600,
          background: "#ff9900",
          border: "none",
          borderRadius: 8,
        }}
      >
        Add to cart
      </Button>
    </Card>
  );
}

export default ProductCard;