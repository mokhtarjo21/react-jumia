
import React, { useState,useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
// import './App.css'
import JumiaLogin from './components/login/HomeLogin'
import VendorLogin from './components/loginVendor/homelogin'
import TestHomePage from './components/test_homepage/test_homepage'
import CategoryPage from './components/category_page/category_main'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
     
      <BrowserRouter>

    
                <Routes>
                    <Route path="/login/*" element={<JumiaLogin />} />
                    <Route path="/loginvendor/*" element={<VendorLogin />} />
                    <Route path="/test" element={<TestHomePage />} />
                    <Route path="/:category/" element={<CategoryPage />} />
                </Routes>
              

            </BrowserRouter>
   
    </>
  )
}

export default App
