import React from 'react';
import styles from './home_header.module.css';
import CategoryMenuWrapper from './category_tree_component/CategoryMenuWrapper';
import HeaderCarousel from './panner_carrousel/header_carousel';
import RightmostDiv from './rightmost_div/rightmost';

const HomeHeader = () => {
    return (
        <div className={`${styles.homeHeaderContainer}`}>
            <div className="row g-3">
                <div className={`col- col-md- ${styles.leftColumn}`}>
                    <CategoryMenuWrapper />
                </div>
                <div className={`col- col-md- ${styles.centerColumn}`}>
                    <HeaderCarousel />
                </div>
                <div className={`col- col-md- ${styles.rightColumn}`}>
                    <RightmostDiv />
                </div>
            </div>
        </div>
    );
};

export default HomeHeader;