import React from 'react';
import ProductCard from '../../product_card/card';
import ProductsDroplistMenu from './products_droplist_menu_component/products_droplist_menu';
import './products.css';

function Products({ products, pagination, handlePageChange }) {
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
  );
}

export default Products;
