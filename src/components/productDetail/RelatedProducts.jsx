import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const RelatedProducts = () => {
  const products = [
    {
      title: "Nivea Roll-On 50ml",
      img: "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/58/386373/1.jpg",
      price: "EGP 90"
    },
    {
      title: "Nivea Men Spray 150ml",
      img: "https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/10/322163/1.jpg",
      price: "EGP 135"
    }
  ];

  return (
    <div className="mt-4">
      <h5>Related Products</h5>
      <Row>
        {products.map((product, index) => (
          <Col key={index} md={6} className="mb-3">
            <Card>
              <Card.Img variant="top" src={product.img} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.price}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RelatedProducts;
