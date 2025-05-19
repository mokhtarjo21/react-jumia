// src/App.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Screens & Pages
import JumiaLogin from "./components/login/HomeLogin";
import VendorLogin from "./components/loginVendor/homelogin";
import ProductDetails from "./components/productDetail/home";
import Home from "./components/home/Home"; 
import CategoryPage from "./components/category_page/category_main";

import VendorDashboard from "./components/VendorDashboard/home";
// Layout & Shared
import Layout from "./components/productDetail/Layout";
import FavoritesInitializer from "./components/FavoritesInitializer";
import Cart from "./components/cart/CartPage";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <FavoritesInitializer />
      <BrowserRouter>
        <>
          <Routes>
            <Route path="/login/*" element={<JumiaLogin />} />
            <Route path="/loginvendor/*" element={<VendorLogin />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="product/:product_id" element={<ProductDetails />} />
              <Route path=":category/" element={<CategoryPage />} />
              <Route path="cart/" element={<Cart />} />
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