import React, { useEffect, useState } from 'react';
import { instance } from '../../axiosInstance/instance';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import Loader from "../loader/loder"
import { toast } from 'react-toastify';
import { Button, Table, Form, InputGroup, Modal } from 'react-bootstrap';
const ProductList = () => {
 const [products, setProducts] = useState([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [loader,setLoader]=useState(true)
const [searchSid, setSearchSid] = useState('');
const [searchSku, setSearchSku] = useState('');
const filteredProducts = products.filter((product) => {
  const sidMatch = searchSid === '' || product.name?.toLowerCase().includes(searchSid.toLowerCase());
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
                  setLoader(false)
                 
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
  const handelDelete = (id) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;

  const deleteProduct = async () => {
    try {
      const access = localStorage.getItem('access');
      const response = await instance.delete(`/api/products/${id}/delete/`, {
        headers: {
          'Authorization': `Bearer ${access}`,
        },
      });
      if (response.status === 204 || response.status === 200) {
        console.log("Delete OK");
        setProducts(products.filter((s) => s.id !== id));
         toast.error("Deleted Done !")
      } else {
        console.error("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  deleteProduct();
};

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
  try {
    const access = localStorage.getItem('access');
    const dataprod={name :currentProduct.name,price :currentProduct.price,sale_price:currentProduct.sale_price,stock_quantity:currentProduct.stock_quantity}
    console.log(dataprod)
    const response = await instance.put(
      `/api/vendor/update/${currentProduct.id}/`,
      dataprod,
      {
        headers: {
          'Authorization': `Bearer ${access}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      toast.success("Product Updated");
      const updated = [...products];
      console.log(response.data)
      updated[editIndex] = response.data;
      setProducts(updated);
      setShowEditModal(false);
      console.log("Product updated successfully");
    } else {
      console.error("Failed to update product");
    }
  } catch (error) {
     ;
      console.error("Error saving product:");
      if (error.response) {
         
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data); 
      } else {
         toast.error(error.message)
        console.log(error.message);
      }
    }
};


if(loader){
  return <Loader/>;
}
  return (
    <>
     <div className="col-md-12 p-1">
       <div className="d-flex flex-wrap gap-2 mb-3">
        <InputGroup>
  <Form.Control
    placeholder="Search by Name"
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
          // onClick={() => handleEditClick(product, idx)}
          onClick={()=>handelDelete(product.id)}
        >
          Delete
        </Button>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => handleEditClick(product, idx)}
          
        >
          Edite
        </Button>
      </td>
    </tr>
  ))
)}
        </tbody>
      </Table>

      <div className="text-end mt-3">
        <Button variant="warning" className="me-2" onClick={handleExport}>
           Export
        </Button>
      </div>

     

      {/* Edit Product Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentProduct && (
            <Form>
              {['name', 'price', 'sale_price', 'stock_quantity'].map((field) => (
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
