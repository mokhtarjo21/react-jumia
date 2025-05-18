// src/components/home/CategorySidebar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTshirt, FaMobileAlt, FaHeartbeat, FaCouch, FaLaptop, FaGamepad, FaBook, FaQuestion } from "react-icons/fa";

const iconMap = {
  fashion: <FaTshirt className="me-2" />,
  electronics: <FaMobileAlt className="me-2" />,
  "health-beauty": <FaHeartbeat className="me-2" />,
  "home-office": <FaCouch className="me-2" />,
  computing: <FaLaptop className="me-2" />,
  gaming: <FaGamepad className="me-2" />,
  books: <FaBook className="me-2" />,
};

const CategorySidebar = ({ categories, onCategorySelect, activeCategory }) => {
  const [expandedSlug, setExpandedSlug] = useState(null);
  const navigate = useNavigate();

  const handleClick = (cat) => {
    onCategorySelect(cat.slug);
    setExpandedSlug(expandedSlug === cat.slug ? null : cat.slug);
    navigate(`/${cat.slug}`);
  };

  const handleChildClick = (child) => {
    onCategorySelect(child.slug);
    navigate(`/${child.slug}`);
  };

  return (
    <div className="bg-white shadow-sm position-relative">
      <ul className="list-unstyled m-0">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="position-relative"
            onMouseEnter={() => setExpandedSlug(cat.slug)}
            onMouseLeave={() => setExpandedSlug(null)}
          >
            <div
              onClick={() => handleClick(cat)}
              className={`px-3 py-2 fw-medium d-flex align-items-center ${
                activeCategory === cat.slug ? "bg-warning text-dark" : "text-dark"
              }`}
              style={{ cursor: "pointer" }}
            >
              {iconMap[cat.slug] || <FaQuestion className="me-2" />} {cat.name}
            </div>

            {expandedSlug === cat.slug && cat.children && cat.children.length > 0 && (
              <div
                className="position-absolute top-0 start-100 bg-white shadow rounded p-3"
                style={{ minWidth: "250px", zIndex: 10 }}
              >
                <ul className="list-unstyled mb-0">
                  {cat.children.map((child) => (
                    <li
                      key={child.id}
                      onClick={() => handleChildClick(child)}
                      className={`px-2 py-1 rounded small ${
                        activeCategory === child.slug ? "bg-warning text-dark" : "text-muted"
                      }`}
                      style={{ cursor: "pointer" }}
                    >
                      {child.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
