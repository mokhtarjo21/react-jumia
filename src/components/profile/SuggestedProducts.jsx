const SuggestedProducts = () => {
    // Keep it static temporarily
    return (
      <div className="product-section">
        <h3>Best Selling Products</h3>
        <div className="products-row">
          {/* Repeat products */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div className="product-card" key={i}>
              <img src="https://via.placeholder.com/150" alt="product" />
              <p>Product Name</p>
              <p>Price: 100.00 EGP</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default SuggestedProducts;
  