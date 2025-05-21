import React, {useEffect, useState } from 'react';
import { instance } from '../../axiosInstance/instance';
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
 const navigate = useNavigate();
  const [images, setImages] = useState(Array(8).fill(null)); // ملفات الصور
  const [colors,setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [sizes,setSizes] = useState([]);
  
  const [categories, setCategories] = useState([]); 
  const [brands, setBrands] = useState([]); // قائمة العلامات التجارية
  // البيانات الأساسية مع كل الحقول المطلوبة
  const [product, setProduct] = useState({
    name: '',
    images: [],
    category: '',
    brand_name: '',
    price: '',
    sku: '',
    description: '',
    stock_quantity: '',     
    discount: '',  
     colors: [],
  sizes: [],
  });


    useEffect(() => { 
       const userinfo = async () => {
                try {
                  const access =localStorage.getItem('access')
                  const response = await instance.get('/api/vendor/', {
                    headers: {
                      'Authorization': `Bearer ${access}`,
                       
                    }
                  });
                  if (response.status === 200) {
                    const data = response.data;
                 
                    setSizes(data.sizes);
                    setColors(data.colors);
                    setCategories(data.categories);
                    setBrands(data.brands);
                    console.log(sizes);
                   console.log(data);
                  } else {
                    console.error('Failed to fetch user info');
                  }
                } catch (error) {
                  console.error('Error fetching user info:', error);
                }
              }
              userinfo();
    }, []);
  // حالة للأخطاء
  const [errors, setErrors] = useState({});

  // تعديل الصور
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = file;
      setImages(updatedImages);
    }
  };

  const handleColorChange = (color) => {
    console.log(color);
    setProduct({ ...product, colors: [...product.colors,color] });
    setSelectedColor(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
    console.log(selectedColor,product.colors);
  };

  const handleSizeChange = (size) => {
    console.log(size);
    setProduct({ ...product, sizes: [...product.sizes,size] });
    setSelectedSize(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
    console.log(selectedSize);
  };




  const validate = () => {
    let tempErrors = {};
    if (!product.name.trim()) tempErrors.name = 'Name is required';
    if (!product.category.trim()) tempErrors.category = 'Category is required';
    if (!product.brand_name.trim()) tempErrors.brand_name = 'Brand is required';
    if (!product.price || isNaN(product.price)) tempErrors.price = 'Valid price is required';
    if (!product.sku.trim()) tempErrors.sku = 'SKU is required';
    if (!product.description.trim()) tempErrors.description = 'Description is required';
    if (!product.stock_quantity || isNaN(product.stock_quantity)) tempErrors.stock = 'Valid stock quantity is required';


    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
const Save = async () => {
  if (!validate()) {
    return;
  }

  const formData = new FormData();
  formData.append('name', product.name);
  formData.append('category', product.category);
  formData.append('brand_name', product.brand_name);
  formData.append('price', product.price);
  formData.append('sale_price', product.sale_price);
  formData.append('sku', product.sku);
  formData.append('description', product.description);
  formData.append('stock_quantity', product.stock_quantity);

  // أضف الألوان كمصفوفة
  product.colors.forEach(color => {
    formData.append('colors', color); // لاحظ بدون [] في الاسم
  });

  // أضف المقاسات كمصفوفة
  product.sizes.forEach(size => {
    formData.append('sizes', size);
  });

images.forEach((file, index) => {
  if (file) {
    formData.append('images_data', file); // 👈 بدون [] غالبًا كافي حسب إعدادات الباك اند
  }
});
 console.log(formData);
  try {
    const response = await instance.post('/api/products/create/', formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 201 || response.status === 200) {
      console.log('Product added successfully:', response.data);
      navigate("/vendor");
    } else {
      console.error('Error adding product:', response.data);
    }
  } catch (error) {
    console.error("Error saving product:");
    if (error.response) {
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data); 
    } else {
      console.log(error.message);
    }
  }
};


  return (
    <div className="col-md-10 p-4">
      <h4 className="fw-bold">Add Product</h4>

      <div className="d-flex flex-wrap mb-4 gap-2">
        {images.map((file, index) => (
          <div
            key={index}
            className="border border-warning rounded d-flex align-items-center justify-content-center position-relative"
            style={{ width: 100, height: 100, borderStyle: 'dashed', cursor: 'pointer', overflow: 'hidden' }}
          >
            <input
              type="file"
              accept="image/*"
              style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer' }}
              onChange={e => handleImageChange(e, index)}
            />
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt={`upload-${index}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <span className="text-warning">+ Image</span>
            )}
          </div>
        ))}
      </div>

      <div className="row g-3 mb-3">
        {/* Name */}
        <div className="col-md-6">
          <label className="form-label fw-bold">Name *</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder="Product name"
            value={product.name}
            onChange={e => setProduct({ ...product, name: e.target.value })}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Category */}
        <div className="col-md-6">
  <label className="form-label fw-bold">Category *</label>
  <select
    className={`form-select ${errors.category ? 'is-invalid' : ''}`}
    value={product.category}
    onChange={e => setProduct({ ...product, category: e.target.value })}
  >
    <option value="">-- Select Category --</option>
    {categories.map(cat => (
      <option key={cat.id} value={cat.id}>
        {cat.name}
      </option>
    ))}
  </select>
  {errors.category && <div className="invalid-feedback">{errors.category}</div>}
</div>

        {/* Brand */}
       <div className="col-md-6">
  <label className="form-label fw-bold">Brand *</label>
  <select
    className={`form-select ${errors.brand ? 'is-invalid' : ''}`}
    value={product.brand}
    onChange={e => setProduct({ ...product, brand_name: e.target.value })}
  >
    <option value="">-- Select Brand --</option>
    {brands.map(brand => (
      <option key={brand.id} value={brand.id}>
        {brand.name}
      </option>
    ))}
  </select>
  {errors.brand && <div className="invalid-feedback">{errors.brand}</div>}
</div>


        {/* Price */}
        <div className="col-md-6">
          <label className="form-label fw-bold">Price *</label>
          <input
            type="number"
            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
            placeholder="Ex: 199"
            value={product.price}
            onChange={e => setProduct({ ...product, price: e.target.value })}
          />
          {errors.price && <div className="invalid-feedback">{errors.price}</div>}
        </div>

        {/* SKU */}
        <div className="col-md-6">
          <label className="form-label fw-bold">SKU *</label>
          <input
            type="text"
            className={`form-control ${errors.sku ? 'is-invalid' : ''}`}
            placeholder="Ex: MOK-td"
            value={product.sku}
            onChange={e => setProduct({ ...product, sku: e.target.value })}
          />
          {errors.sku && <div className="invalid-feedback">{errors.sku}</div>}
        </div>

        {/* Stock */}
        <div className="col-md-6">
          <label className="form-label fw-bold"> Quantity *</label>
          <input
            type="number"
            className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
            placeholder="Ex: 100"
            value={product.stock_quantity}
            onChange={e => setProduct({ ...product, stock_quantity: e.target.value })}
          />
          {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
        </div>

        {/* Discount */}
        <div className="col-md-6">
          <label className="form-label fw-bold">Sale Price </label>
          <input
            type="number"
            className="form-control"
            placeholder="Ex: 10"
            value={product.sale_price}
            onChange={e => setProduct({ ...product, sale_price: e.target.value })}
          />
        </div>

        {/* Description */}
        <div className="col-md-12">
          <label className="form-label fw-bold">Product Description *</label>
          <textarea
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            rows="4"
            placeholder="Write product description here..."
            value={product.description}
            onChange={e => setProduct({ ...product, description: e.target.value })}
          />
          {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        </div>

        {/* Colors Multi-Select */}
        <div className="col-md-6">
          <label className="form-label fw-bold">Available Colors</label>
          <div className="d-flex flex-wrap gap-2">
            {colors.map(color => (
  <div key={color.id} className="form-check">
    <input
      className="form-check-input"
      type="checkbox"
      id={`color-${color.id}`}
      value={color.id}
      checked={selectedColor.includes(color.id)}
      onChange={() => handleColorChange(color.id)}
    />
    <label className="form-check-label" htmlFor={`color-${color.id}`}>
      {color.name}
    </label>
  </div>
))}
          </div>
        </div>

        {/* Sizes Multi-Select */}
        <div className="col-md-6">
          <label className="form-label fw-bold">Available Sizes</label>
          <div className="d-flex flex-wrap gap-2">
            {sizes.map(size => (
              <div key={size.id} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`size-${size.id}`}
                  value={size.id}
                  checked={selectedSize.includes(size.id)}
                  onChange={() => handleSizeChange(size.id)}
                />
                <label className="form-check-label" htmlFor={`size-${size}`}>
                  {size.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="col-12">
          <button onClick={Save} className="btn btn-warning fw-bold px-5">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
