import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FiltersSidebar from './filter_sidebar';
import Products from './products';
import { useParams, useSearchParams } from 'react-router-dom';
import CategoryGrid from '../category_grid/category_grid';
import "./category_page.css";

function CategoryPage() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [pagination, setPagination] = useState({ count: 0, current_page: 1, total_pages: 1 });
  const [filters, setFilters] = useState({
    brandList: [],
    min_price: '',
    max_price: '',
    discount: null,
    express_delivery: false,
    shipped_from: ''
  });

  // Build API URL dynamically
  const API_URL = `http://127.0.0.1:8000/api/category/${category}/products/`;

  // Update filters from URL params on mount
  useEffect(() => {
    const urlBrands = searchParams.get('brand')?.split(',') || [];
    setFilters(f => ({
      ...f,
      brandList: urlBrands,
      min_price: searchParams.get('min_price') || '',
      max_price: searchParams.get('max_price') || '',
      discount: searchParams.get('discount_min') || null,
      express_delivery: searchParams.get('express_delivery') === '1',
      shipped_from: searchParams.get('shipped_from') || ''
    }));
  }, []);

  // Fetch products and brands when filters or page change
  useEffect(() => {
    fetchProducts();
  }, [searchParams, category]);

  const fetchProducts = async () => {
    const params = Object.fromEntries([...searchParams]);
    try {
      const { data } = await axios.get(API_URL, { params });
      setProducts(data.products);
      setBrands(data.brands.map(b => b.name));
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  // Handle filter change and update URL
  const handleFilterChange = (newFilters) => {
    const params = { ...Object.fromEntries([...searchParams]) };
    
    // Handle non-price filters
    if (newFilters.brandList !== undefined) {
      params.brand = newFilters.brandList.join(',');
    }
    if (newFilters.discount !== undefined) {
      params.discount_min = newFilters.discount;
    }
    if (newFilters.express_delivery !== undefined) {
      params.express_delivery = newFilters.express_delivery ? '1' : undefined;
    }
    if (newFilters.shipped_from !== undefined) {
      params.shipped_from = newFilters.shipped_from || undefined;
    }
    
    // Handle price filters separately
    if (newFilters.min_price !== undefined || newFilters.max_price !== undefined) {
      setFilters(prev => ({
        ...prev,
        min_price: newFilters.min_price !== undefined ? newFilters.min_price : prev.min_price,
        max_price: newFilters.max_price !== undefined ? newFilters.max_price : prev.max_price
      }));
      return; // Don't update URL for price changes
    }
    
    // Remove undefined parameters
    Object.keys(params).forEach(key => {
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


  // dummy category data 
  const categories = [
    {
      id: "mobiles",
      title: "Mobiles",
      imageSrc: "../../../../../category_imges/mobileseng.png ",
      href: "/mobiles"
    },
    {
      id: "headsets",
      title: "Headsets",
      imageSrc: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2831&auto=format&fit=crop",
      href: "/category/headsets"
    },
    {
      id: "wearables",
      title: "Wearables",
      imageSrc: "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?q=80&w=2942&auto=format&fit=crop",
      href: "/category/wearables"
    },
    {
      id: "cases",
      title: "Cases",
      imageSrc: "https://images.unsplash.com/photo-1603313011638-94aa4778ed99?q=80&w=2070&auto=format&fit=crop",
      href: "/category/cases"
    },
    {
      id: "accessories",
      title: "Accessories",
      imageSrc: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=2978&auto=format&fit=crop",
      href: "/category/accessories"
    },
    {
      id: "screens",
      title: "Screens",
      imageSrc: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?q=80&w=3107&auto=format&fit=crop",
      href: "/category/screens"
    },
    {
      id: "screens",
      title: "Screens",
      imageSrc: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?q=80&w=3107&auto=format&fit=crop",
      href: "/category/screens"
    },
    {
      id: "screens",
      title: "Screens",
      imageSrc: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?q=80&w=3107&auto=format&fit=crop",
      href: "/category/screens"
    },
    {
      id: "screens",
      title: "Screens",
      imageSrc: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?q=80&w=3107&auto=format&fit=crop",
      href: "/category/screens"
    },
    {
      id: "screens",
      title: "Screens",
      imageSrc: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?q=80&w=3107&auto=format&fit=crop",
      href: "/category/screens"
    },
    {
      id: "screens",
      title: "Screens",
      imageSrc: "https://images.unsplash.com/photo-1511385348-a52b4a160dc2?q=80&w=3107&auto=format&fit=crop",
      href: "/category/screens"
    }
  ];
  return (
    <div className="container-fluid category-page">
      <div className="row">
        <div className="col-md-12">
          <h1>Category Page</h1>
          <CategoryGrid categories={categories} />
        </div>
      </div>

      <hr />
      <hr />
      <div className="row">
        {/* Sidebar */}
        <aside className="col-md-3 border-end">
          <FiltersSidebar 
            filters={filters} 
            setFilters={handleFilterChange}
            handlePriceFilterApply={handlePriceFilterApply}
            brands={brands} 
          />
        </aside>
        {/* Products Component */}
        <Products 
          products={products}
          pagination={pagination}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default CategoryPage;