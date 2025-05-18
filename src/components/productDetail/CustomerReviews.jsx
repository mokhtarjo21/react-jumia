import React from 'react';
import { Card } from 'react-bootstrap';



const CustomerReviews = () => {
  return (
    <div>
      <h5>Customer Reviews</h5>
      <div>
        <strong>4.5 ★</strong> based on 232 reviews
      </div>
      <p>“Great phone for the price!” – Ahmed</p>
      {/* More reviews */}
    </div>
  );
};

export default CustomerReviews;

// const CustomerReviews = () => {










//   return (
//     <div className="mt-4">
//       <h5>Customer Reviews</h5>
//       <Card className="mb-3">
//         <Card.Body>
//           <Card.Title>⭐⭐⭐⭐⭐</Card.Title>
//           <Card.Text>Great smell and lasts all day!</Card.Text>
//           <small className="text-muted">by Sarah - March 2024</small>
//         </Card.Body>
//       </Card>
//       <Card className="mb-3">
//         <Card.Body>
//           <Card.Title>⭐⭐⭐⭐</Card.Title>
//           <Card.Text>Nice product, but I prefer the roll-on version.</Card.Text>
//           <small className="text-muted">by Aya - February 2024</small>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// };

// export default CustomerReviews;

