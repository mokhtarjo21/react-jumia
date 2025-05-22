import React from 'react';
import styles from './home_header.module.css';
import CategoryMenuWrapper from './category_tree_component/CategoryMenuWrapper';
import HeaderCarousel from './panner_carrousel/header_carousel';
import RightmostDiv from './rightmost_div/rightmost';

const HomeHeader = () => {
    return (
        <div className={styles.homeHeaderContainer}>
            <div className={styles.leftColumn}>
                <CategoryMenuWrapper />
            </div>
            <div className={styles.centerColumn}>
                <HeaderCarousel />
            </div>
            <div className={styles.rightColumn}>
                <RightmostDiv />
            </div>
        </div>
    );
};

export default HomeHeader;