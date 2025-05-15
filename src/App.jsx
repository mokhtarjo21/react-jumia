
import React, { useState,useContext, useEffect } from "react";
import LoginForm from "./components/login/Loginpass";
import Login from "./components/login/Login";
import Active from "./components/login/active";

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
// import './App.css'
import JumiaLogin from './components/login/HomeLogin'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
     
      <BrowserRouter>

    
                <Routes>
                    <Route path="/login/*" element={<JumiaLogin />} />
                  
                </Routes>
              

            </BrowserRouter>
   
    </>
  )
}

export default App
