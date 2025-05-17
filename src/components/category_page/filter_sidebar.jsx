import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import "./filter_sidebar.css";
import axios from "axios";

function FiltersSidebar({ filters, setFilters, brands }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBrands, setFilteredBrands] = useState(brands);
  const [sliderValues, setSliderValues] = useState({
    min: filters.min_price || 0,
    max: filters.max_price || 5000
  });
  const [isDraggingMin, setIsDraggingMin] = useState(false);
  const [isDraggingMax, setIsDraggingMax] = useState(false);
  const sliderRef = useRef(null);
  
  // Filter brands based on search term
  useEffect(() => {
    if (searchTerm) {
      setFilteredBrands(brands.filter(brand => 
        brand.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredBrands(brands);
    }
  }, [searchTerm, brands]);

  // Handle price range change from inputs
  const handlePriceChange = (type, value) => {
    const numValue = value === "" ? "" : Number(value);
    if (type === "min_price") {
      setSliderValues(prev => ({ ...prev, min: numValue }));
    } else {
      setSliderValues(prev => ({ ...prev, max: numValue }));
    }
    setFilters({ ...filters, [type]: value });
  };

  // Calculate slider thumb positions
  const calculatePosition = (value) => {
    const min = 0;
    const max = 10000; // Adjust max value as needed
    const percentage = ((value - min) / (max - min)) * 100;
    return Math.min(Math.max(percentage, 0), 100);
  };

  // Handle mouse down on thumbs
  const handleMouseDown = (thumb) => (e) => {
    e.preventDefault();
    if (thumb === 'min') {
      setIsDraggingMin(true);
    } else {
      setIsDraggingMax(true);
    }
  };

  // Handle mouse move for dragging thumbs
  const handleMouseMove = (e) => {
    if (!isDraggingMin && !isDraggingMax) return;
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const width = rect.width;
    const offsetX = e.clientX - rect.left;
    const percentage = Math.min(Math.max((offsetX / width) * 100, 0), 100);
    const value = Math.round((percentage / 100) * 10000);
    if (isDraggingMin) {
      const newMin = Math.min(value, sliderValues.max - 100);
      setSliderValues(prev => ({ ...prev, min: newMin }));
      setFilters({ ...filters, min_price: newMin.toString() });
    } else if (isDraggingMax) {
      const newMax = Math.max(value, sliderValues.min + 100);
      setSliderValues(prev => ({ ...prev, max: newMax }));
      setFilters({ ...filters, max_price: newMax.toString() });
    }
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setIsDraggingMin(false);
    setIsDraggingMax(false);
  };

  // Add and remove event listeners for dragging
  useEffect(() => {
    if (isDraggingMin || isDraggingMax) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingMin, isDraggingMax, sliderValues]);

  // Handle discount filter change
  const handleDiscountChange = (value) => {
    setFilters({ ...filters, discount: value });
  };

  // Handle brand selection
  const handleBrandChange = (brand, checked) => {
    const newList = checked
      ? [...filters.brandList, brand]
      : filters.brandList.filter(b => b !== brand);
    setFilters({ ...filters, brandList: newList });
  };

  // Handle express delivery filter
  const handleExpressDelivery = (checked) => {
    setFilters({ ...filters, express_delivery: checked });
  };

  // Handle shipped from filter
  const handleShippedFrom = (location, checked) => {
    setFilters({ ...filters, shipped_from: checked ? location : "" });
  };

  // Apply price filter
  const applyPriceFilter = async () => {
    setFilters({ ...filters, min_price: sliderValues.min.toString(), max_price: sliderValues.max.toString() });

    const params = {
      page: 1,
      min_price: filters.min_price,
      max_price: filters.max_price,
      brand: filters.brandList.join(","),
      discount_min: filters.discount,
      express_delivery: filters.express_delivery ? 1 : undefined,
      shipped_from: filters.shipped_from || undefined
    };

    try {
      const { data } = await axios.get(API_URL, { params });
      // Handle the response from the API
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="filter-sidebar">
      <h5>CATEGORY</h5>
      <ul>
        <li>Fashion</li>
        <li>Home & Office</li>
        <li>Health & Beauty</li>
      </ul>

      <h5>EXPRESS DELIVERY</h5>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="expressDelivery"
          checked={filters.express_delivery}
          onChange={(e) => handleExpressDelivery(e.target.checked)}
        />
        <label className="form-check-label d-flex align-items-center" htmlFor="expressDelivery">
          JUMIA <span style={{ color: "#f68b1e", fontWeight: "bold" }}>EXPRESS</span>
        </label>
      </div>

      <h5>SHIPPED FROM</h5>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="shippedFromEgypt"
          checked={filters.shipped_from === "Egypt"}
          onChange={(e) => handleShippedFrom("Egypt", e.target.checked)}
        />
        <label className="form-check-label" htmlFor="shippedFromEgypt">
          Shipped from Egypt
        </label>
      </div>

      <h5>PRICE (EGP)</h5>
      <div className="price-range">
        <input
          type="number"
          className="form-control"
          placeholder="Min"
          value={filters.min_price}
          onChange={(e) => handlePriceChange("min_price", e.target.value)}
        />
        <div className="separator">-</div>
        <input
          type="number"
          className="form-control"
          placeholder="Max"
          value={filters.max_price}
          onChange={(e) => handlePriceChange("max_price", e.target.value)}
        />
      </div>
      
      <div className="slider-container">
        <div className="price-slider" ref={sliderRef}>
          <div 
            className="track" 
            style={{ 
              left: `${calculatePosition(sliderValues.min)}%`, 
              right: `${100 - calculatePosition(sliderValues.max)}%` 
            }}
          ></div>
          <div 
            className="thumb" 
            style={{ left: `${calculatePosition(sliderValues.min)}%` }}
            onMouseDown={handleMouseDown('min')}
          ></div>
          <div 
            className="thumb" 
            style={{ left: `${calculatePosition(sliderValues.max)}%` }}
            onMouseDown={handleMouseDown('max')}
          ></div>
        </div>
      </div>
      
      <div className="apply-btn">
        <button onClick={applyPriceFilter}>Apply</button>
      </div>

      <h5>DISCOUNT PERCENTAGE</h5>
      <div className="radio-group">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="discount"
            id="discount50"
            checked={filters.discount === 50}
            onChange={() => handleDiscountChange(50)}
          />
          <label className="form-check-label" htmlFor="discount50">
            50% or more
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="discount"
            id="discount40"
            checked={filters.discount === 40}
            onChange={() => handleDiscountChange(40)}
          />
          <label className="form-check-label" htmlFor="discount40">
            40% or more
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="discount"
            id="discount30"
            checked={filters.discount === 30}
            onChange={() => handleDiscountChange(30)}
          />
          <label className="form-check-label" htmlFor="discount30">
            30% or more
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="discount"
            id="discount20"
            checked={filters.discount === 20}
            onChange={() => handleDiscountChange(20)}
          />
          <label className="form-check-label" htmlFor="discount20">
            20% or more
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="discount"
            id="discount10"
            checked={filters.discount === 10}
            onChange={() => handleDiscountChange(10)}
          />
          <label className="form-check-label" htmlFor="discount10">
            10% or more
          </label>
        </div>
      </div>

      <h5>BRAND</h5>
      <div className="search-box">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div style={{ maxHeight: 200, overflowY: "auto" }}>
        {filteredBrands.map(brand => (
          <div className="form-check" key={brand}>
            <input
              className="form-check-input"
              type="checkbox"
              checked={filters.brandList.includes(brand)}
              onChange={(e) => handleBrandChange(brand, e.target.checked)}
              id={`brand-${brand}`}
            />
            <label className="form-check-label" htmlFor={`brand-${brand}`}>
              {brand}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FiltersSidebar;
