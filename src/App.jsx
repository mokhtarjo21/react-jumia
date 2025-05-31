// src/App.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckoutPage from './components/cart/CheckoutPage';
import PaymentSuccess from './components/PaymentSuccess';



// Screens & Pages
import JumiaLogin from "./components/login/HomeLogin";
import VendorLogin from "./components/loginVendor/homelogin";
import ProductDetails from "./components/productDetail/home";
import Home from "./components/home/Home"; 
import CategoryPage from "./components/category_page/category_main";
import ProfilePage from './components/profile/ProfilePage'

import VendorDashboard from "./components/VendorDashboard/home";
// Layout & Shared
import Layout from "./components/productDetail/Layout";
import Cart from "./components/cart/CartPage";
import PaymentFailed from './components/cart/PaymentFailed';
import PaymentSuccess from './components/cart/PaymentSuccess';



import "./App.css";

function App() {
  return (
    <Provider store={store}>
      
      <BrowserRouter>
        <>
          <Routes>
            <Route path="/login/*" element={<JumiaLogin />} />
            <Route path="/loginvendor/*" element={<VendorLogin />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="product/:product_id" element={<ProductDetails />} />
              <Route path=":category/" element={<CategoryPage />} />
              {/* <Route path="allproducts" element={<CategoryPage />} /> */}
              <Route path="cart/" element={<Cart />} />
              <Route path="checkout/" element={<CheckoutPage />} />
              <Route path="/payment-failed" element={<PaymentFailed />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />


              
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>



            <Route path="/vendor" element={<VendorDashboard />} />
          </Routes>

          {/* ✅ Add this below Routes */}
          <ToastContainer position="top-right" autoClose={2000} />
        </>
      </BrowserRouter>
    </Provider>
  );
}


export default App;