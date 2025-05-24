import React, { useState } from "react";
import Sidebar from "./Sidebar";
import OverviewSection from "./OverviewSection";
import SuggestedProducts from "./SuggestedProducts";
import RecentlyViewed from "./RecentlyViewed";
import AddressInfo from "./AddressInfo";
import FavoriteProductsSection from "./FavoriteProductsSection";
import MyOrders from "./MyOrders";
import styles from "./profile.module.css";

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return (
          <>
            <OverviewSection />
            <SuggestedProducts />
            <RecentlyViewed />
          </>
        );
      case "addresses":
        return <AddressInfo />;
      case "account":
        return <p>Account Management Section</p>;
      case "recently-viewed":
        return <RecentlyViewed />;
      case "orders":
        return <MyOrders />; // ✅ Render full orders
      case "favorites":
        return <FavoriteProductsSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.sidebarWrapper}>
        <Sidebar setActiveSection={setActiveSection} />
      </div>
      <div className={styles.contentWrapper}>{renderSection()}</div>
    </div>
  );
};

export default ProfilePage;