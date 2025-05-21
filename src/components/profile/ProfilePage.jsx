



import React, { useState } from 'react';
import Sidebar from './Sidebar';
import OverviewSection from './OverviewSection';
import SuggestedProducts from './SuggestedProducts';
import RecentlyViewed from './RecentlyViewed';
import AddressInfo from './AddAddress'; 
import FavoriteProductsSection from './SuggestedProducts';

import './profile.css';



const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <>
            <OverviewSection />
            <SuggestedProducts />
            <RecentlyViewed />
          </>
        );
      case 'addresses':
        return <AddressInfo />;
      case 'account':
        return <AccountManagementSection />; 
      case 'recently-viewed':
        return <RecentlyViewed />;
      case 'orders':
        return <p>Orders Section</p>;
        case 'favorites':
          return <FavoriteProductsSection />;       
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="profile-wrapper">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="profile-content">
        {renderSection()}
      </div>
    </div>
  );
};

export default ProfilePage;