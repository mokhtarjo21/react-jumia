import React from 'react';
import Sidebar from './Sidebar';
import OverviewSection from './OverviewSection';
import SuggestedProducts from './SuggestedProducts';
import RecentlyViewed from './RecentlyViewed';
import './profile.css';

const ProfilePage = () => {
  return (
    <div className="profile-wrapper">
      <Sidebar />
      <div className="profile-content">
        <OverviewSection />
        <SuggestedProducts />
        <RecentlyViewed />
      </div>
    </div>
  );
};

export default ProfilePage;
