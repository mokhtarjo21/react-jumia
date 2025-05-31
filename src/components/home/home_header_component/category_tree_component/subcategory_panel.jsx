import React from 'react';
import styles from './category_menu.module.css';
import { Link } from 'react-router-dom';

const SubcategoryPanel = ({ category, onHover, onLeave }) => {
  if (!category || !category.children || category.children.length === 0) return null;
  
  // Function to balance categories across columns and limit subcategories
  const organizeCategories = (categories) => {
    if (!categories || categories.length === 0) return [];
    
    // Sort categories by number of children (descending)
    const sortedCategories = [...categories].sort((a, b) => {
      const aChildCount = a.children ? a.children.length : 0;
      const bChildCount = b.children ? b.children.length : 0;
      return bChildCount - aChildCount;
    });
    
    // Limit the number of subcategories to prevent overflow
    return sortedCategories.map(cat => {
      // Create a shallow copy of the category
      const limitedCat = { ...cat };
      
      // If there are too many children, limit them to prevent overflow
      if (cat.children && cat.children.length > 6) {
        limitedCat.children = cat.children.slice(0, 6); // Show max 6 subcategories
      }
      
      return limitedCat;
    });
  };
  
  const organizedCategories = organizeCategories(category.children);
  
  // Limit the total number of category groups to prevent overflow
  const maxCategories = 12; // Adjust based on your layout
  const displayCategories = organizedCategories.slice(0, maxCategories);
  
  return (
    <div 
      className={styles.subcategoryPanel}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className={styles.flexContainer}>
        {displayCategories.map(sub => (
          <div className={styles.subcategoryGroup} key={sub.id}>
            <Link to={`/${sub.slug}`} className={styles.subcategoryGroupTitle} title={sub.name}>
              {sub.name}
            </Link>
            <div className={styles.subcategoryList}>
              {sub.children && sub.children.length > 0 ? (
                sub.children.map(child => (
                  <Link 
                    className={styles._3rdLevel} 
                    to={`/${child.slug}`} 
                    key={child.id}
                    title={child.name} // Add title for tooltip on hover
                  >
                    {child.name}
                  </Link>
                ))
              ) : (
                <span style={{ color: '#aaa', fontSize: '0.9em' }}>No subcategories</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryPanel;
