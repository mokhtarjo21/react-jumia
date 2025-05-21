import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './price_search.css';

const SLIDER_STEP = 10;

function PriceSearch({ min_price, max_price }) {
  const [searchParams, setSearchParams] = useSearchParams();
  // Store the initial min/max in refs
  const initialMin = useRef(min_price);
  const initialMax = useRef(max_price);

  const [priceRange, setPriceRange] = useState({
    min: min_price,
    max: max_price
  });
  const sliderRef = useRef(null);
  const [dragging, setDragging] = useState(null); // 'min' or 'max' or null

  // Only update state from API props on mount or when they change
  useEffect(() => {
    initialMin.current = min_price;
    initialMax.current = max_price;
    setPriceRange({ min: min_price, max: max_price });
  }, [min_price, max_price]);

  // Handle input change
  const handlePriceChange = (type, value) => {
    let val = value === '' ? '' : Number(value);
    if (val !== '') {
      if (type === 'min') {
        val = Math.max(initialMin.current, Math.min(priceRange.max - SLIDER_STEP, val));
      } else {
        val = Math.min(initialMax.current, Math.max(priceRange.min + SLIDER_STEP, val));
      }
    }
    setPriceRange(prev => ({
      ...prev,
      [type]: val
    }));
  };

  // Handle slider drag
  const handleSliderChange = (type, value) => {
    let val = value;
    if (type === 'min') {
      val = Math.max(initialMin.current, Math.min(priceRange.max - SLIDER_STEP, value));
    } else {
      val = Math.min(initialMax.current, Math.max(priceRange.min + SLIDER_STEP, value));
    }
    setPriceRange(prev => ({ ...prev, [type]: val }));
  };

  // Mouse/touch events for slider
  const getPercent = (value) => ((value - initialMin.current) / (initialMax.current - initialMin.current)) * 100;

  const handleMouseDown = (type) => (e) => {
    e.preventDefault();
    setDragging(type);
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const slider = sliderRef.current;
    if (!slider) return;
    const rect = slider.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let percent = ((clientX - rect.left) / rect.width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    let value = Math.round(initialMin.current + ((initialMax.current - initialMin.current) * percent) / 100);
    handleSliderChange(dragging, value);
  };

  const handleMouseUp = () => setDragging(null);

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchend', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [dragging]);

  // Apply button logic
  const handleApply = () => {
    const currentParams = Object.fromEntries([...searchParams]);
    if (priceRange.min !== '' && priceRange.min !== initialMin.current) {
      currentParams.min_price = priceRange.min;
    } else {
      delete currentParams.min_price;
    }
    if (priceRange.max !== '' && priceRange.max !== initialMax.current) {
      currentParams.max_price = priceRange.max;
    } else {
      delete currentParams.max_price;
    }
    currentParams.page = '1';
    setSearchParams(currentParams);
  };

  return (
    <div className="price-search">
      <div className="price-header">
        <span>PRICE (EGP)</span>
        <button className="apply-btn-inline" onClick={handleApply}>Apply</button>
      </div>
      <div className="slider-container" ref={sliderRef}>
        <div className="slider-bar" />
        <div
          className="slider-range"
          style={{
            left: `${getPercent(priceRange.min)}%`,
            width: `${getPercent(priceRange.max) - getPercent(priceRange.min)}%`
          }}
        />
        <div
          className="slider-thumb"
          style={{ left: `${getPercent(priceRange.min)}%` }}
          onMouseDown={handleMouseDown('min')}
          onTouchStart={handleMouseDown('min')}
        />
        <div
          className="slider-thumb"
          style={{ left: `${getPercent(priceRange.max)}%` }}
          onMouseDown={handleMouseDown('max')}
          onTouchStart={handleMouseDown('max')}
        />
      </div>
      <div className="price-range">
        <input
          type="number"
          className="form-control"
          placeholder="Min"
          value={priceRange.min}
          min={initialMin.current}
          max={priceRange.max - SLIDER_STEP}
          onChange={(e) => handlePriceChange('min', e.target.value)}
        />
        <div className="separator">-</div>
        <input
          type="number"
          className="form-control"
          placeholder="Max"
          value={priceRange.max}
          min={priceRange.min + SLIDER_STEP}
          max={initialMax.current}
          onChange={(e) => handlePriceChange('max', e.target.value)}
        />
      </div>
    </div>
  );
}

export default PriceSearch; 