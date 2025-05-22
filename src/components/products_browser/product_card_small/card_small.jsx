import React from "react";
import { useState } from "react";
import styles from "./card_small.module.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  // Calculate discount percentage if sale_price exists
  const discountPercentage = 
    product.sale_price && product.price
      ? Math.round(
          ((parseFloat(product.price) - parseFloat(product.sale_price)) / parseFloat(product.price)) * 100
        )
      : null;

  // Get the primary image or fallback to first image
  const primaryImage = product.product_images?.find(img => img.is_primary) || product.product_images?.[0];
  const imageUrl = primaryImage?.image
    ? `http://127.0.0.1:8000${primaryImage.image}`
    : "https://via.placeholder.com/150";

  return (
    <Link to={`/product/${product.id}`} className={styles.productCard}>
      {/* Product Image */}
      <div className={styles.productImageContainer}>
        <img 
          src={imageUrl} 
          alt={primaryImage?.alt_text || product.name}
          className={styles.productImage}
        />
      </div>
      
      {/* Discount Badge */}
      {discountPercentage && (
        <div className={styles.discountBadge}>
          -{discountPercentage}%
        </div>
      )}
      
      {/* Product Details */}
      <div className={styles.productDetails}>
        {/* Product Name */}
        <h3 className={styles.productName}>
          {product.name}
        </h3>
        
        {/* Price Info */}
        <div className={styles.priceContainer}>
          <div className={styles.currentPrice}>
            EGP {product.sale_price || product.price}
          </div>
          
          {product.sale_price && (
            <div className={styles.originalPrice}>
              EGP {product.price}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;