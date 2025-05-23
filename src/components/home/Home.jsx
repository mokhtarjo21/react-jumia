// src/components/home/Home.jsx
import { useEffect, useState } from "react";
import { instance } from "../../axiosInstance/instance";
import FeaturedEssentialsRow from "./essentials_banner/FeaturedEssentialsRow";
import ProductsBrowser from "../products_browser/products_browser";
import HomeHeader from './home_header_component/home_header'
const Home = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    instance
      .get("api/category/tree/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Category fetch error:", err));
  }, []);
  useEffect(() => {
    document.body.style.backgroundColor = "#F8BA2A";

    // Reset it on unmount
    return () => {
      document.body.style.backgroundColor = ""; // or your default like "#fff"
    };
  }, []);
  return (
    <>
      <div>
        <HomeHeader />
        <FeaturedEssentialsRow />
        <ProductsBrowser title="Best Sellers" filter="best_sellers=10" navigateTo="best-sellers"/>
        <ProductsBrowser title="Recently Arrived" filter="recent=10" navigateTo="recently-added"/>
        <ProductsBrowser title="Featured Products" filter="is_featured=true" navigateTo="featured-products"/>
        <ProductsBrowser title="Top Deals" filter="has_discount=true" navigateTo="top-deals"/>
        <ProductsBrowser title="Sponsored Products" filter="sponsored=true" navigateTo="sponsored"/>
      </div>
    </>
  );
};

export default Home;
