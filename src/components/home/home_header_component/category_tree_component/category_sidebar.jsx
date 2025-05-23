import React from 'react';
import styles from './category_menu.module.css';
import { Link } from 'react-router-dom';

const CategorySidebar = ({ categories, onHover, onLeave, hoveredCategory, isLoading }) => (
  <div className={styles.sidebar}>
    {isLoading ? (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
        <div class="spinner-border text-danger" role="status">
        </div>
      </div>
    ) : (
      categories.map(cat => (
        <Link to={`/${cat.slug}`}
          key={cat.id}
          className={`${styles.categoryItem} ${hoveredCategory && hoveredCategory.id === cat.id ? styles.active : ''}`}
          onMouseEnter={() => onHover(cat)}
          onMouseLeave={onLeave}
        >
          <span className={styles._1stLevel}>{cat.name}</span>
        </Link>
      ))
    )}
  </div>
);

export default CategorySidebar;
