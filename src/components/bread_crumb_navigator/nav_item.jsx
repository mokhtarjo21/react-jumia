import React from 'react';
import { Link } from 'react-router-dom';

const BreadcrumbItem = ({ name, slug, isLast }) => {
  return (
    <span className="breadcrumb-item">
      {!isLast ? (
        <Link to={`/category/${slug}`}>{name}</Link>
      ) : (
        <span>{name}</span>
      )}
      {!isLast && <span> &gt; </span>}
    </span>
  );
};

export default BreadcrumbItem;