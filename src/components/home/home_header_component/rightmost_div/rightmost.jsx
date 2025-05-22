import React from 'react';
import styles from './rightmost.module.css';

// Import images
import jumiaStarIcon from '../../../../assets/header_rightmost/jumia_star.png';
import sellOnJumiaIcon from '../../../../assets/header_rightmost/sell_on_jumia.png';
import warrantyIcon from '../../../../assets/header_rightmost/warranty.png';
import buyNowPayLaterBanner from '../../../../assets/header_rightmost/218x184opy.png';

const RightmostDiv = () => {
  return (
    <div className={styles.rightmostContainer}>
      {/* Top section with promotional items */}
      <div className={styles.promoSection}>
        {/* Join Jumia */}
        <div className={styles.promoItem}>
          <div className={styles.iconContainer}>
            <img src={jumiaStarIcon} alt="Jumia Star" className={styles.promoIcon} />
          </div>
          <div className={styles.promoContent}>
            <h3 className={styles.promoTitle}>Join Jumia</h3>
            <p className={styles.promoText}>as a Sales Consultant</p>
          </div>
        </div>

        {/* Sell on Jumia */}
        <div className={styles.promoItem}>
          <div className={styles.iconContainer}>
            <img src={sellOnJumiaIcon} alt="Sell on Jumia" className={styles.promoIcon} />
          </div>
          <div className={styles.promoContent}>
            <h3 className={styles.promoTitle}>Sell on JUMIA</h3>
            <p className={styles.promoText}>And Grow Your Business</p>
          </div>
        </div>

        {/* Warranty */}
        <div className={styles.promoItem}>
          <div className={styles.iconContainer}>
            <img src={warrantyIcon} alt="Warranty" className={styles.promoIcon} />
          </div>
          <div className={styles.promoContent}>
            <h3 className={styles.promoTitle}>Warranty</h3>
            <p className={styles.promoText}>On Your Purchases</p>
          </div>
        </div>
      </div>

      {/* Bottom section with Buy Now Pay Later banner */}
      <div className={styles.bannerSection}>
        <img 
          src={buyNowPayLaterBanner} 
          alt="Buy Now Pay Later" 
          className={styles.bannerImage} 
        />
      </div>
    </div>
  );
};

export default RightmostDiv;
