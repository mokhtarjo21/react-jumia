import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';


import "./products_droplist_menu.css";

const SORT_OPTIONS = [
  { label: "Popularity", value: "popularity" },
  { label: "Newest Arrivals", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Product Rating", value: "rating" },
];

const SORT_LABELS = {
  popularity: "Popularity",
  newest: "Newest Arrivals",
  price_asc: "Price: Low to High",
  price_desc: "Price: High to Low",
  rating: "Product Rating",
};

function ProductsDroplistMenu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Get current sort from URL or default to "newest"
  const currentSort = searchParams.get("ordering") || "newest";

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    searchParams.set("ordering", value);
    searchParams.set("page", 1); // Reset to first page on sort change
    setSearchParams(searchParams);
    setOpen(false);
  };

  return (
    
    <div className="sort-dropdown" ref={dropdownRef}>
      <button
        className="sort-dropdown-toggle"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="sort-label">
          Sort by: <span className="sort-label-text">{SORT_LABELS[currentSort]}</span>
        </span>
        <span className="sort-arrow">{open ?<FaChevronUp />:<FaChevronDown /> }</span>
      </button>
      {open && (
        <div className="sort-dropdown-menu">
          {SORT_OPTIONS.map((option) => (
            <div
              key={option.value}
              className={`sort-dropdown-item${currentSort === option.value ? " selected" : ""}`}
              onClick={() => handleSelect(option.value)}
            >
              <span className="sort-radio">
                <span className={`radio-circle${currentSort === option.value ? " checked" : ""}`}></span>
              </span>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsDroplistMenu;
