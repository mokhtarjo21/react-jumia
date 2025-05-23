import React from 'react';
import styles from './category_menu.module.css';
import { Link } from 'react-router-dom';
const SubcategoryPanel = ({ category, onHover, onLeave }) => {
  if (!category || !category.children || category.children.length === 0) return null;
  
  return (
    <div 
      className={styles.subcategoryPanel}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className={styles.flexContainer}>
        {category.children.map(sub => (
          <div className={styles.subcategoryGroup} key={sub.id}>
            <Link to={`/${sub.slug}`} className={styles.subcategoryGroupTitle}>{sub.name}</Link>
            <div className={styles.subcategoryList}>
              {sub.children && sub.children.length > 0 ? (
                sub.children.map(child => (
                  <Link  className={styles._3rdLevel} to={`/${child.slug}`} key={child.id}>{child.name}</Link>
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
