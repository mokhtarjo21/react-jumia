import CategoryCard from "./category_card";
import PropTypes from "prop-types";
import React, { useRef, useState, useEffect } from "react";
import "./category_grid.css";

// for arrow icon
import { MdChevronRight } from "react-icons/md";
import { MdChevronLeft } from "react-icons/md";

const SCROLL_AMOUNT = 250;

const CategoryGrid = ({ categories, header }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateArrows = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  useEffect(() => {
    updateArrows();
    const handleResize = () => updateArrows();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        <span>Shop By {header}...</span>
      </div>
      {canScrollLeft && (
        <div className="category-grid-arrow category-grid-arrow-left" onClick={scrollLeft}>
          <MdChevronLeft size={20} color="white" />
        </div>
      )}
      {canScrollRight && (
        <div className="category-grid-arrow category-grid-arrow-right" onClick={scrollRight}>
          <MdChevronRight size={20} color="white" />
        </div>
      )}
      <div className="category-grid-scroll" ref={scrollRef} onScroll={updateArrows}>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.name}
            imageSrc={category.image}
            href={category.slug}
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
