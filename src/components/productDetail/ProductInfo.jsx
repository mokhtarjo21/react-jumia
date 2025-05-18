const ProductInfo = ({info}) => {
  const add = () => {
    // Placeholder for add to cart functionality
    console.log("Add to cart clicked");
  };
  return (
    <div>
      <h2>{info.name}</h2>
      <p className="text-muted">Brand:{info.brand_name} | {info.rating_average} ★ ({info.rating_count} ratings)</p>
      <h3 className="text-warning">{`$ ${info.price}`}</h3>
      <p>+ Shipping from EGP 20</p>
      <button onClick={add} className="btn btn-warning mt-3">Add to Cart</button>
    </div>
  );
};

  export default ProductInfo;