import React from 'react';
import ProductCard from '../../product_card/card';
import ProductsDroplistMenu from './products_droplist_menu_component/products_droplist_menu';
import './products.css';

function Products({ products, pagination, handlePageChange }) {
  // Function to determine which page buttons to show
  const getPageNumbers = (currentPage, totalPages) => {
    // Always show at most 5 page numbers to prevent overflow
    if (totalPages <= 5) {
      return [...Array(totalPages)].map((_, i) => i + 1);
    }
    
    // If current page is among the first 3 pages
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }
    
    // If current page is among the last 3 pages
    if (currentPage >= totalPages - 2) {
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    
    // Otherwise show current page and 2 pages before and after
    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  };

  return (
    <main className="products-div">
      <div className="category-header-wrapper d-flex justify-content-between align-items-center">

      <div className=" category-header d-flex gap-2 align-items-center">
        <h3>{products.length > 0 ? products[0].category_name : 'No Products'}</h3> <span className='muted-text'>({products.length? products.length : '0' } products found)</span>
      </div>
      <div className="category-options">
        <ProductsDroplistMenu />
      </div>
      </div>
      <hr
        style={{
          height: '1px',
          backgroundColor: 'rgb(199, 199, 199)',
          border: 'none',
          marginBottom: '15px'
        }}
      />
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
          <ul className="pagination justify-content-center flex-wrap">
            {/* First page button */}
            <li className={`page-item ${pagination.current_page === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(1)}>
                &laquo;
              </button>
            </li>
            {/* Previous button */}
            <li className={`page-item ${pagination.current_page === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(pagination.current_page - 1)}>
                &lsaquo;
              </button>
            </li>
            
            {/* Limited page numbers */}
            {getPageNumbers(pagination.current_page, pagination.total_pages).map(pageNum => (
              <li key={pageNum} className={`page-item ${pagination.current_page === pageNum ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(pageNum)}>
                  {pageNum}
                </button>
              </li>
            ))}
            
            {/* Next button */}
            <li className={`page-item ${pagination.current_page === pagination.total_pages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(pagination.current_page + 1)}>
                &rsaquo;
              </button>
            </li>
            {/* Last page button */}
            <li className={`page-item ${pagination.current_page === pagination.total_pages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(pagination.total_pages)}>
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      )}
    </main>
  );
}

export default Products;
