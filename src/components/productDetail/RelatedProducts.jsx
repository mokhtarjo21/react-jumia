const RelatedProducts = () => {
  return (
    <div>
      <h5>Related Products</h5>
      <div className="d-flex overflow-auto gap-3">
        {[1,2,3].map((i) => (
          <div key={i} className="card" style={{ minWidth: '200px' }}>
            <img src="https://via.placeholder.com/200" className="card-img-top" alt="Related" />
            <div className="card-body">
              <h6 className="card-title">Product {i}</h6>
              <p className="text-warning">$99.99</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RelatedProducts;