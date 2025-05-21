import React, { useEffect, useState } from 'react';
import { instance } from '../../axiosInstance/instance';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { Button, Table, Form, InputGroup, Modal } from 'react-bootstrap';
const ProductList = () => {
 const [products, setProducts] = useState([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
const [searchSid, setSearchSid] = useState('');
const [searchSku, setSearchSku] = useState('');
const filteredProducts = products.filter((product) => {
  const sidMatch = searchSid === '' || product.sid?.toLowerCase().includes(searchSid.toLowerCase());
  const skuMatch = searchSku === '' || product.sku?.toLowerCase().includes(searchSku.toLowerCase());
  return sidMatch && skuMatch;
});

  useEffect(() => { 
     const getMyProducts = async () => {
              try {
                const access =localStorage.getItem('access')
                const response = await instance.get('/api/vendor/products', {
                  headers: {
                    'Authorization': `Bearer ${access}`,
                     
                  }
                });
                if (response.status === 200) {
                  const data = response.data;
                  console.log('User info fetched successfully:', data.results);
                  setProducts(data.results)
               
                 
                  // You can set user info in state or context here
                } else {
                  console.error('Failed to fetch user info');
                }
              } catch (error) {
                console.error('Error fetching user info:', error);
              }
            }
            getMyProducts();
  }, []);
  const handleExport = () => {
    const csv = Papa.unparse(products);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'products.csv');
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setProducts(results.data);
        setShowImportModal(false);
      },
    });
  };

  const handleEditClick = (product, index) => {
    setCurrentProduct({ ...product });
    setEditIndex(index);
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    const updated = [...products];
    updated[editIndex] = currentProduct;
    setProducts(updated);
    setShowEditModal(false);
  };



  return (
    <>
     <div className="col-md-10 p-4">
       <div className="d-flex flex-wrap gap-2 mb-3">
        <InputGroup>
  <Form.Control
    placeholder="Search by SID"
    value={searchSid}
    onChange={(e) => setSearchSid(e.target.value)}
  />
  <Button variant="outline-secondary">
    <i className="bi bi-search" />
  </Button>
</InputGroup>

<InputGroup>
  <Form.Control
    placeholder="Search by SKU"
    value={searchSku}
    onChange={(e) => setSearchSku(e.target.value)}
  />
  <Button variant="outline-secondary">
    <i className="bi bi-search" />
  </Button>
</InputGroup>

        
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Sale Price</th>
            <th>category</th>
            <th>Quantity</th>
            <th>Rating</th>
           
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length === 0 ? (
  <tr>
    <td colSpan="9" className="text-center text-muted">
      No records found!
    </td>
  </tr>
) : (
  filteredProducts.map((product, idx) => (
    <tr key={idx}>
      <td>{product.name}</td>
      <td>{product.sku}</td>
      <td>{product.price}</td>
      <td>{product.sale_price}</td>
      <td>{product.category_name}</td>
      <td>{product.stock_quantity}</td>
      <td>{product.rating_average}</td>
      <td>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => handleEditClick(product, idx)}
        >
          Edit
        </Button>
      </td>
    </tr>
  ))
)}
        </tbody>
      </Table>

      <div className="text-end mt-3">
        <Button variant="warning" className="me-2" onClick={() => setShowImportModal(true)}>
          Import / Export
        </Button>
      </div>

      {/* Import/Export Modal */}
      <Modal show={showImportModal} onHide={() => setShowImportModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Import / Export Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <Form.Label>Import CSV</Form.Label>
            <Form.Control type="file" accept=".csv" onChange={handleImport} />
          </div>
          <div className="text-end">
            <Button variant="success" onClick={handleExport}>
              Export to CSV
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Edit Product Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentProduct && (
            <Form>
              {['name', 'sku', 'price', 'salePrice', 'currency', 'quantity', 'visible', 'active'].map((field) => (
                <Form.Group className="mb-3" key={field}>
                  <Form.Label>{field}</Form.Label>
                  <Form.Control
                    type="text"
                    name={field}
                    value={currentProduct[field]}
                    onChange={handleEditChange}
                  />
                </Form.Group>
              ))}
              <div className="text-end">
                <Button variant="primary" onClick={handleSaveEdit}>
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  </>
  );
};

export default ProductList;
