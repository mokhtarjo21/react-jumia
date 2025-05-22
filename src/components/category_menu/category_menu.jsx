import React, { useState, useEffect } from 'react';
import styles from './category_menu.module.css';
import axios from 'axios';

const CategoryMenu = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/category/tree/')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Category fetch error:', err));
  }, []);

  return (
    <div className={styles['nav-container']}>
      <div className={styles.dropdown + ' ' + styles['dropdown-visible']}>
        <div className={styles['dropdown_list']}>
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              className={styles['category-item'] + (hoveredIdx === idx ? ' ' + styles.active : '')}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div>{cat.name}</div>
              <i style={{ color: '#999', fontSize: 14 }}>▸</i>
              {/* Subcategory Panel */}
              {hoveredIdx === idx && cat.children && cat.children.length > 0 && (
                <div className={styles['subcategory-container'] + ' ' + styles['subcategory-visible']}>
                  <div style={{ display: 'flex' }}>
                    {cat.children.map((sub) => (
                      <div className={styles['subcategory-group']} key={sub.id}>
                        <div className={styles['subcategory-group-title']}>{sub.name}</div>
                        <div className={styles['subcategory-list']}>
                          {sub.children && sub.children.length > 0 ? (
                            sub.children.map((child) => (
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
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryMenu;

