import React from 'react';
import BreadcrumbItem from './nav_item';
import { Link } from 'react-router-dom';
import './nav.css';
const Breadcrumb = ({ category }) => {
  const [breadcrumbs, setBreadcrumbs] = React.useState([]);

  React.useEffect(() => {
    const fetchBreadcrumbs = async () => {
      let currentSlug = category.slug;
      const breadcrumbList = [];

      while (currentSlug) {
        const response = await fetch(`http://127.0.0.1:8000/api/category/${currentSlug}`);
        const data = await response.json();
        breadcrumbList.unshift(data);
        currentSlug = data.parent_slug; // Assuming the API returns a parentSlug
      }

      setBreadcrumbs(breadcrumbList);
      console.log("breadcrumbList", breadcrumbList);
    };

    fetchBreadcrumbs();
  }, [category]);

  return (
    <nav className="breadcrumb">
      <span><Link to="/">Home</Link></span>
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={breadcrumb.slug}>
          <span> &gt; </span>
          <BreadcrumbItem
            name={breadcrumb.name}
            slug={breadcrumb.slug}
            isLast={index === breadcrumbs.length - 1}
          />
        </React.Fragment>
      ))}
      {breadcrumbs.length === 0 && (
        <span className="muted-text"> &gt;  Available Products </span>
        )}
    </nav>
  );
};

export default Breadcrumb;
