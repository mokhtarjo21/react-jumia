const ImageGallery = () => {
  return (
    <div id="productCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src="https://via.placeholder.com/500x500" className="d-block w-100" alt="Product" />
        </div>
        {/* Add more items */}
      </div>
    </div>
  );
};