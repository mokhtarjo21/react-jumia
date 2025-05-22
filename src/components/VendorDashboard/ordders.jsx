import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';

import Loader from "../loader/loder"
import { instance } from '../../axiosInstance/instance';
const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [status, setStatus] = useState("All");
  const [loader,setLoader]=useState(true)
  const [dummyOrders,setDummyOrders]=useState([])
//   const filteredProducts = dummyOrders.filter((product) => {
//   if (status=="All"){
//     return product
//   }else{
//     return product.status==status.toLowerCase()
//   } 
  
// });
const filteredProducts = dummyOrders.filter((order) => {
  const matchesStatus = status === "All" || order.status === status.toLowerCase();
  const matchesSearch = searchTerm === '' ||order.order_id?.toString().includes(searchTerm); 
  return matchesStatus && matchesSearch;
});

const [selectedOrder, setSelectedOrder] = useState(null);
const [selectedCustomer, setSelectedCustmer] = useState(null);
const [showModal, setShowModal] = useState(false);
const [showcustomer,setShowcustomer] = useState(false)
const handleView = (order) => {
  setSelectedOrder(order);
  setShowModal(true);
};
const handleCustomer=(order)=>{
  setSelectedCustmer(order)
  setShowcustomer(true)
}
const handleCloseCustomer = () => setShowcustomer(false);
const handleClose = () => setShowModal(false);

  
 useEffect(() => { 
       const userinfo = async () => {
                try {
                  const access =localStorage.getItem('access')
                  const response = await instance.get('/api/orders/vendor-items/', {
                    headers: {
                      'Authorization': `Bearer ${access}`,
                       
                    }
                  });
                  if (response.status === 200) {
                    const data = response.data;
                    console.log(data)
                    
                    setDummyOrders(data);
                    setLoader(false)

                  
                   console.log(data);
                  } else {
                    console.error('Failed to fetch user info');
                  }
                } catch (error) {
                     ;
                      console.error("Error saving product:",error);
                      if (error.response) {
                         
                        console.log("Status:", error.response.status);
                        console.log("Data:", error.response.data); 
                      } else {
                         toast.error(error.message)
                        console.log(error.message);
                      }
                    }
              }
              userinfo();
    }, []);

    const handleOrder=(newstatus,id)=>{
       const userinfo = async () => {
                try {
                  const access =localStorage.getItem('access')
                  const response = await instance.patch(`/api/orders/vendor-items/${id}/`,{status:newstatus}, {
                    headers: {
                      'Authorization': `Bearer ${access}`,
                       
                    }
                  });
                  if (response.status === 200) {
                    const data = response.data;
                    console.log(data)
                    
                  
                  } else {
                    console.error('Failed to fetch user info',response.data);
                  }
                } catch (error) {
                     ;
                      console.error("Error saving product:",error);
                      if (error.response) {
                         
                        console.log("Status:", error.response.status);
                        console.log("Data:", error.response.data); 
                      } else {
                         toast.error(error.message)
                        console.log(error.message);
                      }
                    }
              }
              userinfo();
    }
  const handleExport = () => {
    const csv = Papa.unparse(dummyOrders);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'orders.csv');
  };
  const orderstatuses=[
   
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Canceled",
 
  ];
  const statuses = [
    "All",
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Canceled",
 
  ];

  return (
    <>
      <div className="col-md-12 p-1">
        <h5 className="fw-bold mb-3">
          Orders &gt; <span className="text-warning">{status}</span>
        </h5>

        {/* Status Tabs */}
        <div className="d-flex flex-wrap gap-2 mb-3">
          {statuses.map((s) => (
            <button
              key={s}
              className={`btn btn-sm ${status === s ? 'btn-warning' : 'btn-outline-secondary'}`}
              onClick={() => setStatus(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="d-flex gap-2 mb-3 flex-wrap align-items-center">
  <div style={{ width: "80%" }}>
    <input
      type="text"
      className="form-control"
      placeholder="Search by order number"
      value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  
  <div className="ms-auto d-flex gap-2">
    
    <button className="btn btn-warning" onClick={handleExport}>Export</button>
  </div>
</div>

        

        {/* Orders Table */}
        <div className="table-responsive border">
          <table className="table table-hover align-middle text-center mb-0">
            <thead className="table-light">
              <tr>
                <th><input type="checkbox" /></th>
                <th>Order Number</th>
                <th>Order Date</th>
                <th>Status</th>
                <th>Payment Method</th>
                <th>Price#</th>
                <th>Packed Items</th>
                <th>Address</th>
                <th>customer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>

              {filteredProducts.length > 0 ? filteredProducts.map((order, index) => (
                <tr key={index}>
                  <td><input type="checkbox" /></td>
                  <td>{order.order_id}</td>
                  <td>{order.created_at.slice(0,10)}</td>
                  <td>


                  <select
                className={`form-select `}
                value={order.status}
                onChange={e => handleOrder(e.target.value ,order.order_id)}
              >
                <option value="">-- Select Brand --</option>
                {orderstatuses.map((stat,index) => (
                  <option key={index} value={stat.toLowerCase()}>
                    {stat}
                  </option>
    ))}
  </select>

                  </td>
                  <td>{order.payment_method}</td>
                  <td>{order.product_price}</td>
                  <td>{order.product_name}</td>
                  <td>{order.shipping_address}</td>
                  <td className="btn btn-sm btn-primary" onClick={() => handleCustomer(order.customer) }>{order.customer_name}</td>
                  <td>
                    <button className="btn btn-sm btn-primary" onClick={() => handleView(order) }>View</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="10" className="text-center">No orders to display!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
<Modal show={showModal} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Order Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedOrder ? (
      <div>
        <p><strong>Order Number:</strong> {selectedOrder.order_id}</p>
        <p><strong>Order Date:</strong> {selectedOrder.created_at.slice(0, 10)}</p>
        <p><strong>Status:</strong> {selectedOrder.status}</p>
        <p><strong>Payment Method:</strong> {selectedOrder.payment_method}</p>
        <p><strong>Price:</strong> {selectedOrder.product_price}</p>
        <p><strong>Product:</strong> {selectedOrder.product_name}</p>
        <p><strong>Shipping Address:</strong> {selectedOrder.shipping_address}</p>
        <p><strong>Customer:</strong> {selectedOrder.customer_name}</p>
      </div>
    ) : (
      <p>No order selected.</p>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
<Modal show={showcustomer} onHide={handleCloseCustomer}>
  <Modal.Header closeButton>
    <Modal.Title>Customer Details</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedCustomer ? (
      <div>
        <p><strong>Email: </strong> {selectedCustomer.email}</p>
        <p><strong>First Name:</strong> {selectedCustomer.first_name}</p>
        <p><strong>Last Name :</strong> {selectedCustomer.last_name}</p>
        <p><strong>Payment Method:</strong> {selectedCustomer.payment_method}</p>
        <p><strong>phone:</strong> {selectedCustomer.phone}</p>
        
      </div>
    ) : (
      <p>No order selected.</p>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseCustomer}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
          <div>
            Items per page:
            <select className="form-select d-inline-block w-auto ms-2">
              <option>100</option>
              <option>50</option>
              <option>5</option>
            </select>
          </div>
          <div>
            0 of 0
            <button className="btn btn-sm btn-light ms-2">&laquo;</button>
            <button className="btn btn-sm btn-light">&raquo;</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
