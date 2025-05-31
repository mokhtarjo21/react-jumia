import React, { useEffect, useState } from "react";
import axios from "axios";
import FiltersSidebar from "./filter_sidebar_component/filter_sidebar";
import Products from "./products_list_component/products";
import CategoryInfo from "./category_info/category_info";
import BroductsBrowser from "../products_browser/products_browser";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import CategoryGrid from "../category_grid/category_grid";
import Breadcrumb from "../bread_crumb_navigator/nav";
import "./category_page.css";
import { useSelector } from 'react-redux';

function CategoryPage() {
  const { category } = useParams();
  // to determinte what the hell are we looking for
  const location = useLocation();
  const locationState = location.state || {};

  console.log(category);
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [category_details, setCategoryDetails] = useState({});
  const [brands, setBrands] = useState([]);
  const [min_price, setMinPrice] = useState(0);
  const [max_price, setMaxPrice] = useState(0);
  const [colors, setColors] = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    current_page: 1,
    total_pages: 1,
  });
  const [filters, setFilters] = useState({
    brandList: [],
    min_price: null,
    max_price: null,
    discount: null,
    express_delivery: false,
    shipped_from: "",
  });

  // Get authentication state from Redux store
  const { isLoggedIn } = useSelector((state) => state.user);

  let search_brand = category?.match(/^brand_(.+)$/);
  let search_products = category?.match(/^all_(.+)$/);
  // in case of filtering by new arrivals or recently added prodcuts
  let  recently_added = category?.match(/^recently-added$/);
  let best_sellers = category?.match(/^best-sellers$/);
  let featured_products = category?.match(/^featured-products$/);
  let discount_products = category?.match(/^top-deals$/);
  let sponsored_products = category?.match(/^sponsored$/);
  // default apis
  let API_products = `http://127.0.0.1:8000/api/category/${category}/products/`;
  let API_category_details = `http://127.0.0.1:8000/api/category/${category}`;

  if (search_brand || search_products || recently_added || best_sellers || featured_products || discount_products || sponsored_products) {
    if (search_brand) {
      API_products = `http://127.0.0.1:8000/api/products/?brand=${search_brand[1]}`;
    } else if (search_products) {
      API_products = `http://127.0.0.1:8000/api/products/?q=${search_products[1]}`;
    } else if (recently_added) {
      API_products = `http://127.0.0.1:8000/api/products/?recent=12`;
    } else if (best_sellers) {
      API_products = `http://127.0.0.1:8000/api/products/?best_sellers=12`;
    } else if (featured_products) {
      API_products = `http://127.0.0.1:8000/api/products/?is_featured=true`;
    } else if (discount_products) {
      API_products = `http://127.0.0.1:8000/api/products/?has_discount=true`;
    } else if (sponsored_products) {
      API_products = `http://127.0.0.1:8000/api/products/?sponsored=true`;
    }
    API_category_details = null; 
  }
  console.log(API_products);
  // const API_search_products =  `http://127.0.0.1:8000/api/products/?q=${slug}`;

  // Update filters from URL params on mount
  useEffect(() => {
    const urlBrands = searchParams.get("brand")?.split(",") || [];
    setFilters((f) => ({
      ...f,
      brandList: urlBrands,
      min_price: searchParams.get("min_price") || "",
      max_price: searchParams.get("max_price") || "",
      discount: searchParams.get("discount_min") || null,
      express_delivery: searchParams.get("express_delivery") === "1",
    }));
  }, []);

  // Fetch products and brands when filters or page change
  useEffect(() => {
    fetchProducts();
    if (API_category_details) {
      fetchSubCategories();
    }
  }, [searchParams, category]);

  const fetchProducts = async () => {
    const params = Object.fromEntries([...searchParams]);
    try {
      const { data } = await axios.get(API_products, { params });
      setProducts(data.products);
      setBrands(data.brands || []);
      setMinPrice(data.min_price);
      setMaxPrice(data.max_price);
      setColors(data.colors);
      setPagination(data.pagination);
      console.log(data);
      console.log(API_products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fetchSubCategories = async () => {
    if (!API_category_details) return;
    
    try {
      const { data } = await axios.get(API_category_details);
      setCategoryDetails(data);
    } catch (error) {
      console.error("Failed to fetch sub categories:", error);
    }
  };

  // Handle filter change and update URL
  const handleFilterChange = (newFilters) => {
    const params = { ...Object.fromEntries([...searchParams]) };

    // Handle non-price filters
    if (newFilters.brandList !== undefined) {
      params.brand = newFilters.brandList.join(",");
    }
    if (newFilters.discount !== undefined) {
      params.discount_min = newFilters.discount;
    }
    if (newFilters.express_delivery !== undefined) {
      params.express_delivery = newFilters.express_delivery ? "1" : undefined;
    }
    if (newFilters.shipped_from !== undefined) {
      params.shipped_from = newFilters.shipped_from || undefined;
    }

    // Handle price filters separately
    if (
      newFilters.min_price !== undefined ||
      newFilters.max_price !== undefined
    ) {
      setFilters((prev) => ({
        ...prev,
        min_price:
          newFilters.min_price !== undefined
            ? newFilters.min_price
            : prev.min_price,
        max_price:
          newFilters.max_price !== undefined
            ? newFilters.max_price
            : prev.max_price,
      }));
      return; // Don't update URL for price changes
    }

    // Remove undefined parameters
    Object.keys(params).forEach((key) => {
      if (params[key] === undefined) {
        delete params[key];
      }
    });

    params.page = 1; // Reset to first page on filter change
    setSearchParams(params);
  };

  // Handle price filter application
  const handlePriceFilterApply = (minPrice, maxPrice) => {
    const params = { ...Object.fromEntries([...searchParams]) };
    params.min_price = minPrice;
    params.max_price = maxPrice;
    params.page = 1;
    setSearchParams(params);
  };

  // Handle page change
  const handlePageChange = (page) => {
    const params = { ...Object.fromEntries([...searchParams]), page };
    setSearchParams(params);
  };

  // changing style on page mount 
  useEffect(() => {
    document.body.style.backgroundColor = "#F1F1F2";

    // Reset it on unmount
    return () => {
      document.body.style.backgroundColor = ""; // or your default like "#fff"
    };
  }, []);

  return (
    <div className="">
      {category_details?.children?.length > 0 && (
        <CategoryGrid
          categories={category_details.children}
          header="Category"
        />
      )}

      {brands.length > 0 && !category_details.parent && (
        <CategoryGrid categories={brands} header="Brand" />
      )}

      <div className="col-md-12 breadcrumb-container">
        {category_details && <Breadcrumb category={category_details} />}
      </div>
      <div className="row ">
        <aside className="col-md-3 aside-wrapper">
          <FiltersSidebar 
            subCategories={category_details?.children || []}
            filters={filters}
            setFilters={handleFilterChange}
            handlePriceFilterApply={handlePriceFilterApply}
            brands={brands}
            min_price={min_price}
            max_price={max_price}
            colors={colors}
          />
        </aside>
        <div className="col-md-9">
          <Products
            products={products}
            pagination={pagination}
            handlePageChange={handlePageChange}
          />
        </div>
        
          {isLoggedIn && (
            <BroductsBrowser title="recently viewed" filter="" recentlyViewed={true}/>
          )}
          <CategoryInfo category={category_details} />
      </div>
    </div>
  );
}

export default CategoryPage;
