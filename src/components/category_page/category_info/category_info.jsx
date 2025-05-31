import React from 'react'
import styles from './category_info.module.css'
import { FaTag, FaShoppingBasket, FaStar, FaCreditCard } from 'react-icons/fa';

const CategoryInfo = ({category}) => {
  return (
    <div className={styles.category_info_container}>
        <div className={styles.category_header}>
          <h1>{category.name}</h1>
          <p>{category.description}</p>
        </div>
        
        {/* Benefits Section */}
        <div className={styles.benefits_section}>
          <h2 className={styles.benefits_title}>Benefits of Shopping with Jumia</h2>
          
          <div className={styles.benefits_grid}>
            <div className={styles.benefit_item}>
              <div className={styles.benefit_icon}>
                <FaTag />
              </div>
              <div className={styles.benefit_content}>
                <h3>Affordable Prices</h3>
                <p>Enjoy competitive prices and frequent discounts on a variety of products.</p>
              </div>
            </div>
            
            <div className={styles.benefit_item}>
              <div className={styles.benefit_icon}>
                <FaShoppingBasket />
              </div>
              <div className={styles.benefit_content}>
                <h3>Wide Range</h3>
                <p>Choose from thousands of products across different categories.</p>
              </div>
            </div>
            
            <div className={styles.benefit_item}>
              <div className={styles.benefit_icon}>
                <FaStar />
              </div>
              <div className={styles.benefit_content}>
                <h3>Customer Reviews</h3>
                <p>Make informed decisions with the help of reviews and ratings from other buyers.</p>
              </div>
            </div>
            
            <div className={styles.benefit_item}>
              <div className={styles.benefit_icon}>
                <FaCreditCard />
              </div>
              <div className={styles.benefit_content}>
                <h3>Secure Payment Options</h3>
                <p>Shop with confidence using secure and flexible payment methods.</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CategoryInfo