import React, { useEffect, useState } from 'react';
import Orders from './ordders';
import AddProduct from './add-product';
import Productslist from './products';
import { instance } from "../../axiosInstance/instance";
import { useNavigate } from "react-router-dom";

const VendorDashboard = () => {
 const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');
  const Navigate = useNavigate();
  const [userinfo, setUserinfo] = useState(null);
  const accessToken = localStorage.getItem('access');
  const sublogout = async () => {
      const access = localStorage.getItem('access');
      const refresh = localStorage.getItem('refresh');
      try {
        const responsee = await instance.post('/users/api/logout', { refresh }, {
          headers: {
            Authorization: `Bearer ${access}`
          }
        });
        if (responsee.status === 200) {
          
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          navigate('/loginvendor');
        } else {
          console.error('Logout failed');
        }
      } catch (error) {
        console.error('Logout error:', error.response?.data || error.message);
      }
    }
  useEffect(() => {
    if (accessToken) {
      checkuser();
    }
  }, []);

  const checkuser = async () => {
    try {
      const access = localStorage.getItem('access');
      const response = await instance.get('/users/api/check_vendor', {
        headers: {
          'Authorization': `Bearer ${access}`,
        }
      });
      if (response.status === 200 && response.data.user == "1") {
        setUserinfo(1);
      } else {
        setUserinfo(null);
      }
    } catch (error) {
      setUserinfo(null);
    }
  }

  if (!accessToken || accessToken === 'undefined') {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-6 text-center">
            <h1 className="text-danger">Please Login to Access Vendor Dashboard</h1>
            <button className="btn btn-primary mt-3" onClick={() => Navigate('/loginvendor')}>Login</button>
          </div>
        </div>
      </div>
    );
  }

  if (!userinfo) {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-6 text-center">
            <h1 className="text-danger">Please Login As Vendor to Access Vendor Dashboard</h1>
            <button className="btn btn-primary mt-3" onClick={() => Navigate('/loginvendor')}>Login</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-12 col-md-2 bg-light min-vh-100 p-3 d-flex flex-column">
          <h5 className="text-orange fw-bold">VENDOR CENTER</h5>
          <ul className="nav flex-row flex-md-column mt-3 gap-2">
            <li className="nav-item">
              <a onClick={() => setActiveTab('products')} className={`nav-link ${activeTab === 'products' ? 'active bg-primary text-white rounded' : 'text-dark'}`} style={{ cursor: 'pointer' }}>Products</a>
            </li>
            <li className="nav-item">
              <a onClick={() => setActiveTab('addproduct')} className={`nav-link ${activeTab === 'addproduct' ? 'active bg-primary text-white rounded' : 'text-dark'}`} style={{ cursor: 'pointer' }}>Add Product</a>
            </li>
            <li className="nav-item">
              <a onClick={() => setActiveTab('orders')} className={`nav-link ${activeTab === 'orders' ? 'active bg-primary text-white rounded' : 'text-dark'}`} style={{ cursor: 'pointer' }}>Orders</a>
            </li>
            <li className="nav-item">
              <a onClick={() => setActiveTab('advertise')} className={`nav-link ${activeTab === 'advertise' ? 'active bg-primary text-white rounded' : 'text-dark'}`} style={{ cursor: 'pointer' }}>Advertise your Products</a>
            </li>
            <li className="nav-item">
              <a onClick={() => setActiveTab('Account')} className={`nav-link ${activeTab === 'Account' ? 'active bg-primary text-white rounded' : 'text-dark'}`} style={{ cursor: 'pointer' }}>Account Statements</a>
            </li>
          </ul>
          <div className="mt-auto pt-3">
            <button className="btn btn-warning w-100 mb-3" onClick={sublogout}>Logout</button>
            
          </div>
        </nav>

        {/* Content Area */}
        <main className="col-12 col-md-10">
          {activeTab === 'addproduct' && <AddProduct />}
          {activeTab === 'orders' && <Orders />}
          {activeTab === 'products' && <Productslist />}
          {/* ممكن تضيف باقي التابات هنا */}
        </main>
      </div>
    </div>
  );
};

export default VendorDashboard;
