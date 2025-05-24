import React from "react";
import { Link } from "react-router-dom";
import styles from "./description.module.css";
const HomeDescription = () => {
  return (
    <div className={styles.container} style={{ backgroundColor: "#ffbf00" }}>
      <div style={{ backgroundColor: "white", borderRadius: "5px", padding: "20px" }}>
        <h5>Jumia Egypt - Shop All Your Needs Easily and Safely</h5>
        <p className={styles.descriptionText}>
          Jumia Egypt is your number one online shopping destination, offering you a wide range of products at the best prices and quality.
          Enjoy a convenient shopping experience with over a million products in one place.
        </p>

        <h6>Explore Our Diverse Categories</h6>
        <ul className={styles.list}>
          <li><Link to="/electronics" className={styles.link}>Electronics:</Link> Mobile phones (Apple, Samsung, Xiaomi), TVs, laptops, and accessories.</li>
          <li><Link to="/fashion" className={styles.link}>Fashion:</Link> Clothing for men, women, and kids, including modest wear and shoes.</li>
          <li><Link to="/home-and-kitchen" className={styles.link}>Home & Kitchen:</Link> Refrigerators, washing machines, air conditioners, and décor and cooking essentials.</li>
          <li><Link to="/supermarket" className={styles.link}>Supermarket:</Link> Food, beverages, and daily essentials at competitive prices.</li>
          <li><Link to="/health-and-beauty" className={styles.link}>Health & Beauty:</Link> Cosmetics, perfumes, and care products from global brands.</li>
        </ul>

        <h6>Exclusive Offers and Great Services</h6>
        <ul className={styles.list}>
          <li><Link to="/deals-and-discounts" className={styles.link}>Deals & Discounts:</Link> Enjoy ongoing promotions like Mobile Week and Ramadan offers.</li>
          <li><Link to="/jumia-express" className={styles.link}>Jumia Express:</Link> Fast delivery for products from Jumia's warehouse.</li>
          <li><Link to="/secure-payment-methods" className={styles.link}>Secure Payment Methods:</Link> Cash on delivery, credit cards (Visa, MasterCard), and Fawry.</li>
          <li><Link to="/free-returns" className={styles.link}>Free Returns:</Link> Return your purchases for free within 14 days.</li>
        </ul>

        <h6>Why Choose Jumia?</h6>
        <ul className={styles.list}>
          <li>Shopping Convenience: Buy everything easily from home.</li>
          <li><Link to="/customer-service" className={styles.link}>Customer Service:</Link> Reach us via 19586 or social media all week long.</li>
          <li><Link to="/vendorlogin" className={styles.link}>Sell on Jumia:</Link> Join as a partner and increase your sales through our platform.</li>
        </ul>

        <p><Link to="/" className={styles.link}>Start Shopping Now</Link> with Jumia Egypt for a unique experience combining quality and variety!</p>
      </div>
    </div>
  );
};

export default HomeDescription;
