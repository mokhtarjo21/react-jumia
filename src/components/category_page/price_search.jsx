import React, { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import './price_search.css';

const SLIDER_MIN = 0;
const SLIDER_MAX = 10000;
const SLIDER_STEP = 10;

const PriceSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState({
    min: Number(searchParams.get('min_price')) || SLIDER_MIN,
    max: Number(searchParams.get('max_price')) || SLIDER_MAX
  });
  const sliderRef = useRef(null);
  const [dragging, setDragging] = useState(null); // 'min' or 'max' or null

  // Handle input change
  const handlePriceChange = (type, value) => {
    let val = value === '' ? '' : Math.max(SLIDER_MIN, Math.min(SLIDER_MAX, Number(value)));
    setPriceRange(prev => ({
      ...prev,
      [type]: val
    }));
  };

  // Handle slider drag
  const handleSliderChange = (type, value) => {
    let val = Math.max(SLIDER_MIN, Math.min(SLIDER_MAX, value));
    if (type === 'min') {
      val = Math.min(val, priceRange.max - SLIDER_STEP);
    } else {
      val = Math.max(val, priceRange.min + SLIDER_STEP);
    }
    setPriceRange(prev => ({ ...prev, [type]: val }));
  };

  // Mouse/touch events for slider
  const getPercent = (value) => ((value - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100;

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
    let value = Math.round(SLIDER_MIN + ((SLIDER_MAX - SLIDER_MIN) * percent) / 100);
    handleSliderChange(dragging, value);
  };

  const handleMouseUp = () => setDragging(null);

  React.useEffect(() => {
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
    // eslint-disable-next-line
  }, [dragging]);

  // Apply button logic
  const handleApply = () => {
    const currentParams = Object.fromEntries([...searchParams]);
    if (priceRange.min !== '' && priceRange.min !== SLIDER_MIN) {
      currentParams.min_price = priceRange.min;
    } else {
      delete currentParams.min_price;
    }
    if (priceRange.max !== '' && priceRange.max !== SLIDER_MAX) {
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
          min={SLIDER_MIN}
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
          max={SLIDER_MAX}
          onChange={(e) => handlePriceChange('max', e.target.value)}
        />
      </div>
    </div>
  );
};

export default PriceSearch; 