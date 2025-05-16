
import React, { useState,useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
// import './App.css'
import JumiaLogin from './components/login/HomeLogin'
import VendorLogin from './components/loginVendor/homelogin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
     
      <BrowserRouter>

    
                <Routes>
                    <Route path="/login/*" element={<JumiaLogin />} />
                    <Route path="/loginvendor/*" element={<VendorLogin />} />
                </Routes>
              

            </BrowserRouter>
   
    </>
  )
}

export default App
