import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { toast } from 'react-toastify';
import Loader from "../loader/loder"
import { instance } from '../../axiosInstance/instance';
const OrdersPage = () => {
  const [status, setStatus] = useState("Pending");
  const [loader,setLoader]=useState(true)
  const dummyOrders = [
    {
      orderNumber: '12345',
      orderDate: '2025-05-18',
      pendingSince: '2 days',
      paymentMethod: 'Cash',
      price: '$100',
      packedItems: '2',
      labels: 'Normal',
      shipmentMethod: 'DHL'
    },
  ];

  
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
                    // setSizes(data.sizes);
                    // setColors(data.colors);
                    // setCategories(data.categories);
                    // setBrands(data.brands);
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

  const handleExport = () => {
    const csv = Papa.unparse(dummyOrders);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'orders.csv');
  };

  const statuses = [
    "All",
    "Pending",
    "Ready to Ship",
    "Shipped",
    "Delivered",
    "Canceled",
    "Delivery Failed",
    "Returned"
  ];

  return (
    <>
      <div className="col-md-10 p-4">
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
        <div className="d-flex gap-2 mb-3 flex-wrap">
          <button className="btn btn-outline-danger">+ Click to choose (Country)</button>
          <button className="btn btn-outline-danger">+ Click to choose (Date)</button>
          <div className="ms-auto d-flex gap-2">
            <button className="btn btn-outline-warning">Filters</button>
            <button className="btn btn-warning" onClick={handleExport}>Export</button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Search by order number" />
        </div>

        {/* Orders Table */}
        <div className="table-responsive border">
          <table className="table table-hover align-middle text-center mb-0">
            <thead className="table-light">
              <tr>
                <th><input type="checkbox" /></th>
                <th>Order Number</th>
                <th>Order Date</th>
                <th>Pending Since</th>
                <th>Payment Method</th>
                <th>Price#</th>
                <th>Packed Items</th>
                <th>Labels</th>
                <th>Shipment Method</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dummyOrders.length > 0 ? dummyOrders.map((order, index) => (
                <tr key={index}>
                  <td><input type="checkbox" /></td>
                  <td>{order.orderNumber}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.pendingSince}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.price}</td>
                  <td>{order.packedItems}</td>
                  <td>{order.labels}</td>
                  <td>{order.shipmentMethod}</td>
                  <td>
                    <button className="btn btn-sm btn-primary">View</button>
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

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
          <div>
            Items per page:
            <select className="form-select d-inline-block w-auto ms-2">
              <option>100</option>
              <option>50</option>
              <option>20</option>
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
