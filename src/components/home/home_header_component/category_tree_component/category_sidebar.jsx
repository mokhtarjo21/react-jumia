import React from 'react';
import styles from './category_menu.module.css';

const CategorySidebar = ({ categories, onHover, onLeave, hoveredCategory }) => (
  <div className={styles.sidebar}>
    {categories.map(cat => (
      <div
        key={cat.id}
        className={`${styles.categoryItem} ${hoveredCategory && hoveredCategory.id === cat.id ? styles.active : ''}`}
        onMouseEnter={() => onHover(cat)}
        onMouseLeave={onLeave}
      >
        <span>{cat.name}</span>
        <span>▸</span>
      </div>
    ))}
  </div>
);

export default CategorySidebar;
