import React from 'react';
import Sidebar from './Sidebar';
import OverviewSection from './OverviewSection';
import SuggestedProducts from './SuggestedProducts';
import RecentlyViewed from './RecentlyViewed';
import styles from './profile.module.css';

const ProfilePage = () => {
  return (
    <div className={styles['profile-wrapper']}>
      <Sidebar />
      <div className={styles['profile-content']}>
        <OverviewSection />
        <SuggestedProducts />
        <RecentlyViewed />
      </div>
    </div>
  );
};

export default ProfilePage;
