import React from 'react';
import Orders from './ordders';
import AddProduct from './add-product';
import Productslist from './products';
const VendorDashboard = () => {
  const [activeTab, setActiveTab] = React.useState('products');
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 bg-light min-vh-100 p-3">
          <h5 className="text-orange fw-bold">VENDOR CENTER</h5>
          <ul className="nav flex-column mt-4">
            <li className="nav-item"><a onClick={()=>setActiveTab('products')} className={`nav-link ${activeTab == 'products'?' active bg-primary text-white rounded':'text-dark'}`}>Products</a></li>
            <li className="nav-item"><a  onClick={()=>setActiveTab('addproduct')} className={`nav-link ${activeTab == 'promotions'?' active bg-primary text-white rounded':'text-dark'}`}>Add Product</a></li>
            <li className="nav-item"><a  onClick={()=>setActiveTab('orders')} className={`nav-link ${activeTab == 'orders'?' active bg-primary text-white rounded':'text-dark'}`}>Orders</a></li>
            <li className="nav-item"><a  onClick={()=>setActiveTab('advertise')} className={`nav-link ${activeTab == 'advertise'?' active bg-primary text-white rounded':'text-dark'}`}>Advertise your Products</a></li>
            <li className="nav-item"><a  onClick={()=>setActiveTab('Account')} className={`nav-link ${activeTab == 'Account'?' active bg-primary text-white rounded':'text-dark'}`}>Account Statements</a></li>
          </ul>
          <div className="mt-auto pt-3">
            <button className="btn btn-warning w-100">Choose Shops</button>
            <div className="mt-4">
              <p className="mb-0">mekhtek</p>
              <small className="text-muted">mokhtar.jo1024@gmail.com</small>
            </div>
          </div>
        </div>
        {activeTab == 'addproduct'?< AddProduct/>:''}
        {activeTab == 'orders'?<Orders/>:''}
        {activeTab == 'products'?<Productslist/>:''}
      </div>
    </div>
  );
};

export default VendorDashboard;
