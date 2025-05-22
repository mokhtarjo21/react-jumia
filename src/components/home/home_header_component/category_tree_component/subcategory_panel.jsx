import React from 'react';
import styles from './category_menu.module.css';

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
            <div className={styles.subcategoryGroupTitle}>{sub.name}</div>
            <div className={styles.subcategoryList}>
              {sub.children && sub.children.length > 0 ? (
                sub.children.map(child => (
                  <a href={`/category/${child.slug}`} key={child.id}>{child.name}</a>
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
