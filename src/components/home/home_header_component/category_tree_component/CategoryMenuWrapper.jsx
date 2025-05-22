import React, { useState, useEffect, useRef } from 'react';
import CategorySidebar from './category_sidebar';
import SubcategoryPanel from './subcategory_panel';
import styles from './category_menu.module.css';
import axios from 'axios';

const CategoryMenuWrapper = () => {
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isSubcategoryHovered, setIsSubcategoryHovered] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/category/tree/')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Category fetch error:', err));
  }, []);

  const handleHover = (category) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHoveredCategory(category);
  };

  const handleLeave = () => {
    // Only set hoveredCategory to null if the subcategory panel is not being hovered
    if (!isSubcategoryHovered) {
      timeoutRef.current = setTimeout(() => {
        setHoveredCategory(null);
      }, 100); // Small delay to allow moving to subcategory panel
    }
  };

  const handleSubcategoryHover = (isHovered) => {
    setIsSubcategoryHovered(isHovered);
    if (isHovered && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleSubcategoryLeave = () => {
    setIsSubcategoryHovered(false);
    timeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 100);
  };

  return (
    <div className={styles.menuWrapper}>
      <CategorySidebar
        categories={categories}
        onHover={handleHover}
        onLeave={handleLeave}
        hoveredCategory={hoveredCategory}
      />
      <SubcategoryPanel 
        category={hoveredCategory} 
        onHover={() => handleSubcategoryHover(true)}
        onLeave={handleSubcategoryLeave}
      />
    </div>
  );
};

export default CategoryMenuWrapper;
