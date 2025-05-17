import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import JumiaLogin from "./components/login/HomeLogin";
import VendorLogin from "./components/loginVendor/homelogin";
import ProductDetials from "./components/productDetail/home";
import TestHomePage from "./components/test_homepage/test_homepage";
import CategoryPage from "./components/category_page/category_main";
import Layout from "./components/productDetail/Layout";
import FavoritesInitializer from "./components/FavoritesInitializer";

function App() {
  return (
    <Provider store={store}>
      <FavoritesInitializer />
      <BrowserRouter>
        <Routes>
          <Route path="/login/*" element={<JumiaLogin />} />
          <Route path="/loginvendor/*" element={<VendorLogin />} />
          <Route path="/" element={<Layout />}>
            <Route path="product/" element={<ProductDetials />} />
            <Route path="test" element={<TestHomePage />} />
            <Route path=":category/" element={<CategoryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
