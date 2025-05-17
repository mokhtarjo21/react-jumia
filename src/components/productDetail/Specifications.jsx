import React from 'react';
import { Table } from 'react-bootstrap';

const Specifications = () => {
  return (
    <div className="mt-4">
      <h5>Specifications</h5>
      <Table striped bordered>
        <tbody>
          <tr>
            <td>Weight</td>
            <td>0.15 kg</td>
          </tr>
          <tr>
            <td>SKU</td>
            <td>NI226ST0A5VVZNAFAMZ</td>
          </tr>
          <tr>
            <td>Product Line</td>
            <td>Black & White Invisible Silky Smooth</td>
          </tr>
          <tr>
            <td>Size (L x W x H)</td>
            <td>5 x 5 x 18 cm</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Specifications;
