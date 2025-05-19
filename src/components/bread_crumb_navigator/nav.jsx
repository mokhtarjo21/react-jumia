import React from 'react';
import BreadcrumbItem from './nav_item';

const Breadcrumb = ({ categorySlug }) => {
  const [breadcrumbs, setBreadcrumbs] = React.useState([]);

  React.useEffect(() => {
    const fetchBreadcrumbs = async () => {
      let currentSlug = categorySlug;
      const breadcrumbList = [];

      while (currentSlug) {
        const response = await fetch(`/api/${currentSlug}`);
        const data = await response.json();
        breadcrumbList.unshift(data);
        currentSlug = data.parentSlug; // Assuming the API returns a parentSlug
      }

      setBreadcrumbs(breadcrumbList);
    };

    fetchBreadcrumbs();
  }, [categorySlug]);

  return (
    <nav className="breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <BreadcrumbItem
          key={breadcrumb.slug}
          name={breadcrumb.name}
          slug={breadcrumb.slug}
          isLast={index === breadcrumbs.length - 1}
        />
      ))}
    </nav>
  );
};

export default Breadcrumb;
