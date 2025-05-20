import './category_menu.css';
import React, { useState } from 'react';
import styles from './category_menu.module.css';
import { FaBars } from 'react-icons/fa';

// Example data structure
const categories = [
  {
    name: 'Fashion',
    icon: '👕',
    subcategories: [
      {
        name: "Women's Fashion",
        children: [
          'Tops & T-Shirts', 'Dresses', 'Blouses', 'Bottoms', 'Sneakers', 'Swimwear', 'Sportswear', 'Homewear & Lingerie', 'Sandals & Slippers', 'Accessories', 'Kimonos', 'Sports Shoes'
        ]
      },
      {
        name: "Men's Fashion",
        children: [
          'T-Shirts & Polos', 'Shirts', 'Pants', 'Sportswear', 'Shorts', 'Footwear', 'Swimwear', 'Sports Shoes', 'Pyjamas', 'Watches', 'Underwear', 'Accessories'
        ]
      },
      {
        name: "Kid's Fashion",
        children: [
          "Boy's Fashion", "Girl's Fashion", "Baby Boy's Fashion", "Baby Girl's Fashion"
        ]
      },
      {
        name: 'Top Brands',
        children: ['LC Waikiki', 'Defacto', 'Activ', 'Adidas', 'American Eagle']
      }
    ]
  },
  {
    name: 'Phones & Tablets',
    icon: '📱',
    subcategories: [
      {
        name: 'Smartphones',
        children: ['Android Phones', 'iPhones', 'Feature Phones']
      },
      {
        name: 'Tablets',
        children: ['Android Tablets', 'iPads']
      },
      {
        name: 'Accessories',
        children: ['Chargers', 'Cables', 'Power Banks', 'Cases']
      }
    ]
  },
  // ... add more categories as needed
];

const CategoryMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const toggleMenu = () => setIsOpen((v) => !v);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className={styles.nav_container}>
      {/* Nav Button */}
      <button className={styles.nav_btn} onClick={toggleMenu} aria-label="Open categories menu">
        <FaBars />
      </button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className={styles.dropdown} onMouseLeave={closeMenu}>
          <div className={styles.dropdown_list}>
            {categories.map((cat, idx) => (
              <div
                key={cat.name}
                className={styles.category_item + (hoveredIdx === idx ? ' ' + styles.active : '')}
                onMouseEnter={() => setHoveredIdx(idx)}
              >
                <div>
                  <span className={styles.category_icon}>{cat.icon}</span>
                  {cat.name}
                </div>
                <i style={{ color: '#999', fontSize: 14 }}>▸</i>
                {/* Subcategory Panel */}
                {hoveredIdx === idx && (
                  <div className={styles.subcategory_container}>
                    {cat.subcategories.map((sub, subIdx) => (
                      <div className={styles.subcategory_group} key={sub.name}>
                        <div className={styles.subcategory_group_title}>{sub.name}</div>
                        <div className={styles.subcategory_list}>
                          {sub.children.map((child) => (
                            <a href="#" key={child}>{child}</a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryMenu;