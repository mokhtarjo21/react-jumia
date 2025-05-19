import CategoryCard from "./category_card";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import "./category_grid.css";

// for arrow icon
import { MdChevronRight } from "react-icons/md";
import { MdChevronLeft } from "react-icons/md";

const SCROLL_AMOUNT = 250;

const CategoryGrid = ({ categories }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
    }
  };

  return (
    <div className="category-grid-outer">
      <div className="category-grid-header">
        <span>Shop By Category...</span>
      </div>
      <div
        className="category-grid-arrow category-grid-arrow-left"
        onClick={scrollLeft}
      >
        <MdChevronLeft size={20} color="white" />
      </div>
      <div
        className="category-grid-arrow category-grid-arrow-right"
        onClick={scrollRight}
      >
        <MdChevronRight size={20} color="white" />
      </div>
      <div className="category-grid-scroll" ref={scrollRef}>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            imageSrc={category.imageSrc}
            href={category.href}
          />
        ))}
      </div>
    </div>
  );
};

CategoryGrid.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      imageSrc: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CategoryGrid;
