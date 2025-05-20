import React, { useEffect, useState } from "react";
import axios from "axios";
import FiltersSidebar from "./filter_sidebar";
import Products from "./products";
import { useParams, useSearchParams } from "react-router-dom";
import CategoryGrid from "../category_grid/category_grid";
import Breadcrumb from "../bread_crumb_navigator/nav";
import "./category_page.css";

function CategoryPage() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [category_details, setCategoryDetails] = useState({});
  const [brands, setBrands] = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    current_page: 1,
    total_pages: 1,
  });
  const [filters, setFilters] = useState({
    brandList: [],
    min_price: "",
    max_price: "",
    discount: null,
    express_delivery: false,
    shipped_from: "",
  });

  // Build API URL dynamically
  const API_products = `http://127.0.0.1:8000/api/category/${category}/products/`;
  const API_category_details = `http://127.0.0.1:8000/api/category/${category}`;

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
      shipped_from: searchParams.get("shipped_from") || "",
    }));
  }, []);

  // Fetch products and brands when filters or page change
  useEffect(() => {
    fetchProducts();
    fetchSubCategories();
  }, [searchParams, category]);

  const fetchProducts = async () => {
    const params = Object.fromEntries([...searchParams]);
    try {
      const { data } = await axios.get(API_products, { params });
      setProducts(data.products);
      setBrands(data.brands);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fetchSubCategories = async () => {
    const { data } = await axios.get(API_category_details);
    try {
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
        <Breadcrumb category={category_details} />
      </div>
      <div className="row ">

        <aside className="col-md-3 aside-wrapper">
          <FiltersSidebar 
            subCategories={category_details.children}
            filters={filters}
            setFilters={handleFilterChange}
            handlePriceFilterApply={handlePriceFilterApply}
            brands={brands}
          />
        </aside>
        <div className="col-md-9">
        <Products
          products={products}
          pagination={pagination}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
