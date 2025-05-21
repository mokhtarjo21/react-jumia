import React ,{useEffect, useState} from 'react';
import Orders from './ordders';
import AddProduct from './add-product';
import Productslist from './products';
import { instance } from "../../axiosInstance/instance";
import { useNavigate } from "react-router-dom";
const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const Navigate = useNavigate();
  const [userinfo, setUserinfo] = useState()
  const accessToken = localStorage.getItem('access');
  useEffect(() => {
    //  const userinfo = async () => {
    //       try {
    //         const access =localStorage.getItem('access')
    //         const response = await instance.get('/api/products/', {
    //           headers: {
    //             'Authorization': `Bearer ${access}`,
                 
    //           }
    //         });
    //         if (response.status === 200) {
    //           const data = response.data;
    //           console.log('User info fetched successfully:', data);
    //           // setUserinfo(data,);
           
    //           console.log('User info:', userinfo);
    //           // You can set user info in state or context here
    //         } else {
    //           console.error('Failed to fetch user info');
    //         }
    //       } catch (error) {
    //         console.error('Error fetching user info:', error);
    //       }
    //     }
    //     userinfo();
  
  }
  , []);
  //  if (accessToken == null || accessToken == 'undefined') {
  //   // Navigate('/loginvendor');
  //   return (
  //     <div className="container-fluid">
  //       <div className="row justify-content-center align-items-center min-vh-100">
  //         <div className="col-md-6 text-center">
  //           <h1 className="text-danger">Please Login to Access Vendor Dashboard</h1>
  //           <button className="btn btn-primary mt-3" onClick={() => Navigate('/loginvendor')}>Login</button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
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
