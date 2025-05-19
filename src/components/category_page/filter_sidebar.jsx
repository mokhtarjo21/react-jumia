import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./filter_sidebar.css";
import Checkbox from "./checkbox";
import PriceSearch from "./price_search";

function FiltersSidebar({ filters, setFilters, brands }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBrands, setFilteredBrands] = useState(brands);
  
  // Filter brands based on search term
  useEffect(() => {
    if (searchTerm) {
      setFilteredBrands(brands.filter(brand => 
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredBrands(brands);
    }
  }, [searchTerm, brands]);

  return (
    <div className="filter-sidebar">
      <h5>CATEGORY</h5>
      <ul>
        <li>Fashion</li>
        <li>Home & Office</li>
        <li>Health & Beauty</li>
      </ul>

      <h5>EXPRESS DELIVERY</h5>
      <Checkbox
        label={
          <span>
            JUMIA <span style={{ color: "#f68b1e", fontWeight: "bold" }}>EXPRESS</span>
          </span>
        }
        slug="True"
        paramName="is_featured"
      />

      <h5>SHIPPED FROM</h5>
      <Checkbox
        label="Shipped from Egypt"
        slug="egypt"
        paramName="shipped_from"
      />

      <h5>PRICE (EGP)</h5>
      <PriceSearch />

      <h5>DISCOUNT PERCENTAGE</h5>
      <div className="radio-group">
        <Checkbox
          label="50% or more"
          slug="50"
          paramName="discount_min"
          isRadio={true}
        />
        <Checkbox
          label="40% or more"
          slug="40"
          paramName="discount_min"
          isRadio={true}
        />
        <Checkbox
          label="30% or more"
          slug="30"
          paramName="discount_min"
          isRadio={true}
        />
        <Checkbox
          label="20% or more"
          slug="20"
          paramName="discount_min"
          isRadio={true}
        />
        <Checkbox
          label="10% or more"
          slug="10"
          paramName="discount_min"
          isRadio={true}
        />
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
          <Checkbox
            key={brand.slug}
            label={brand.name}
            slug={brand.slug}
            paramName="brand"
          />
        ))}
      </div>
    </div>
  );
}

export default FiltersSidebar;
