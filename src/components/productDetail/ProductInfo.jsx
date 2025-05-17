import React from 'react';
import { Badge } from 'react-bootstrap';

const ProductInfo = () => {
  return (
    <div>
      <h4>Nivea Antiperspirant Spray For Women - 150ml</h4>
      <p>Brand: <strong>Nivea</strong> | <a href="#">Similar products</a></p>
      <div>
        <span className="h5 text-danger">EGP 179</span>
        <del className="text-muted ms-2">EGP 220</del>
        <Badge bg="success" className="ms-2">-19%</Badge>
      </div>
      <p className="mt-2">In Stock - Ships from Jumia</p>
      <button className="btn btn-warning mt-3 w-100">Add to Cart</button>
    </div>
  );
};

export default ProductInfo;
