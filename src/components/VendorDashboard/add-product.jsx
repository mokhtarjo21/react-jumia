import React ,{useState} from 'react';

const AddProduct = () => {


     const [images, setImages] = useState(Array(8).fill(null));

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = URL.createObjectURL(file);
      setImages(updatedImages);
    }
  };

    return (
        <>
         
        {/* Form */}
        <div className="col-md-10 p-4">
          <h4 className="fw-bold">Add Products</h4>
          <h5 className="mb-4">Product Information</h5>

          {/* Images Upload Section */}
          <div className="d-flex flex-wrap mb-4 gap-2">
            {images.map((image, index) => (
              <div
                key={index}
                className="border border-warning rounded d-flex align-items-center justify-content-center position-relative"
                style={{
                  width: 100,
                  height: 100,
                  borderStyle: 'dashed',
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer' }}
                  onChange={(e) => handleImageChange(e, index)}
                />
                {image ? (
                  <img src={image} alt={`upload-${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span className="text-warning">+ Image</span>
                )}
              </div>
            ))}
          </div>

          {/* Product Info Form */}
          <form>
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">Name *</label>
                <input type="text" className="form-control" placeholder="Product name" />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Category *</label>
                <select className="form-select">
                  <option>Information Technology Magazines</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Brand *</label>
                <input type="text" className="form-control" placeholder="e.g. Samsung" />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-bold">Colour</label>
                <input type="text" className="form-control" placeholder="e.g. Red" />
              </div>
              <div className="col-md-3">
                <label className="form-label fw-bold">Color Family</label>
                <select className="form-select">
                  <option>Black</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Weight (kg) *</label>
                <input type="text" className="form-control" placeholder="Ex: 1.2 kg" />
              </div>
              <div className="col-md-12">
                <label className="form-label fw-bold">Product Description *</label>
                <textarea className="form-control" rows="4" placeholder="Write product description here..."></textarea>
              </div>
            </div>

            <button className="btn btn-warning fw-bold px-5">Submit</button>
          </form>
        </div>
    </>
      
    );}
export default AddProduct;