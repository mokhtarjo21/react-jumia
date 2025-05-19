// src/components/home/Home.jsx
import { useEffect, useState } from "react";
import { instance } from "../../axiosInstance/instance";
import CategorySidebar from "./CategorySidebar";
import CarouselBanner from "./CarouselBanner";
import HomePromotions from "./HomePromotions";
import FlashSaleStrip from "./FlashSaleStrip";
import InfoPromoGrid from "./InfoPromoGrid";
import RecommendedRow from "./RecommendedRow";
import NewArrivalsRow from "./NewArrivalsRow";
import TopDealsRow from "./TopDealsRow";
import RecentlyViewedRow from "./RecentlyViewedRow";
import TopPromoStrip from "./TopPromoStrip";
import ExtraPromotionsRow from "./ExtraPromotionsRow";
import FeaturedEssentialsRow from "./FeaturedEssentialsRow";
import BrandPromoStrip from "./BrandPromoStrip";
import CategoryTileStrip from "./CategoryTileStrip";
import CartPreviewRow from "./CartPreviewRow";


const Home = () => {
  const [categories, setCategories] = useState([]);
  const [flashProducts, setFlashProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("fashion");

  useEffect(() => {
    instance
      .get("api/category/tree/")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Category fetch error:", err));
  }, []);

  useEffect(() => {
    if (activeCategory) {
      instance
        .get(`api/category/${activeCategory}/products/`)
        .then((res) => {
          if (Array.isArray(res.data)) {
            setFlashProducts(res.data);
          } else {
            console.warn("Unexpected flash data structure:", res.data);
            setFlashProducts([]);
          }
        })
        .catch((err) => {
          console.error("Flash products fetch error:", err);
          setFlashProducts([]);
        });
    }
  }, [activeCategory]);

  const handleCategoryClick = (slug) => {
    setActiveCategory(slug);
  };

  const handleAddToCart = (productId) => {
    console.log("Add to cart:", productId);
  };

  return (
    <>
      <TopPromoStrip />
      <div className="container-fluid bg-light p-0">
        <div className="row gx-0">
          <div className="col-md-2">
            <CategorySidebar
              categories={categories}
              onCategorySelect={handleCategoryClick}
              activeCategory={activeCategory}
            />
            <div className="p-2 d-none d-md-block">
              <img
                src="https://via.placeholder.com/180x350?text=Promo+Right"
                alt="Side Banner Right"
                className="img-fluid rounded mt-3"
              />
            </div>
          </div>

          <div className="col-md-8">
            <CarouselBanner />
          </div>

          <div className="col-md-2 d-none d-md-block">
            <div className="p-2">
              <img
                src="https://via.placeholder.com/180x350?text=Promo+Left"
                alt="Side Banner Left"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>

        <div className="px-3 mt-4">
          <HomePromotions />
          <InfoPromoGrid />
          <ExtraPromotionsRow />   {/*  !!@@ row */}
          <FeaturedEssentialsRow />
          <FlashSaleStrip products={flashProducts} onAddToCart={handleAddToCart} />
          <RecommendedRow />
          <CartPreviewRow />
          <BrandPromoStrip />
          <NewArrivalsRow />
          <CategoryTileStrip />
          <TopDealsRow />
          <RecentlyViewedRow />
        </div>
      </div>
    </>
  );
};

export default Home;
