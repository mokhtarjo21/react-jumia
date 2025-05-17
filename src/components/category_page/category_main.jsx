import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../product_card/card';
import FiltersSidebar from './filter_sidebar';
import { useParams, useSearchParams } from 'react-router-dom';
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
    // Build params from searchParams
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
    if (newFilters.brandList) params.brand = newFilters.brandList.join(',');
    if (newFilters.min_price !== undefined) params.min_price = newFilters.min_price;
    if (newFilters.max_price !== undefined) params.max_price = newFilters.max_price;
    if (newFilters.discount !== undefined) params.discount_min = newFilters.discount;
    if (newFilters.express_delivery !== undefined) params.express_delivery = newFilters.express_delivery ? '1' : undefined;
    if (newFilters.shipped_from !== undefined) params.shipped_from = newFilters.shipped_from;
    params.page = 1; // Reset to first page on filter change
    setSearchParams(params);
  };

  // Handle page change
  const handlePageChange = (page) => {
    const params = { ...Object.fromEntries([...searchParams]), page };
    setSearchParams(params);
  };

  return (
    <div className="container-fluid category-page">
      <div className="row">
        {/* Sidebar */}
        <aside className="col-md-3 border-end">
          <FiltersSidebar 
            filters={filters} 
            setFilters={handleFilterChange} 
            brands={brands} 
          />
        </aside>
        {/* Main Content */}
        <main className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1>{category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category'}</h1>
          </div>
          <hr />
          {products.length === 0 ? (
            <div className="text-center py-5">
              <h3>No products found</h3>
              <p>Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            <div className="row">
              {products.map(product => (
                <div className="col-12 col-sm-6 col-lg-3 mb-4" key={product.id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
          {/* Pagination Controls */}
          {pagination.total_pages > 1 && (
            <nav>
              <ul className="pagination justify-content-center">
                <li className={`page-item ${pagination.current_page === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(pagination.current_page - 1)}>
                    Previous
                  </button>
                </li>
                {[...Array(pagination.total_pages)].map((_, idx) => (
                  <li key={idx} className={`page-item ${pagination.current_page === idx + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(idx + 1)}>
                      {idx + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${pagination.current_page === pagination.total_pages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(pagination.current_page + 1)}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </main>
      </div>
    </div>
  );
}

export default CategoryPage;