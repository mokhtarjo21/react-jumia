import React from 'react';
import { Link } from 'react-router-dom';
import './nav_item.css';
const BreadcrumbItem = ({ name, slug, isLast }) => {
  return (
    <span className="breadcrumb-item">
      {!isLast ? (
        <Link to={`/${slug}`}> {name} </Link>
      ) : (
        <span  className="muted-text"> {name}</span>
      )}
    </span>
  );
};

export default BreadcrumbItem;