
import React, { useState,useContext } from "react";
import LoginForm from "./Loginpass";
import Login from "./Login";
import Active from "./active";
import { UserProvider } from '../../Context/user';
import { BrowserRouter, Route, Routes } from "react-router-dom";
function JumiaLogin() {
  

  return (
    <>
  

<BrowserRouter>
<UserProvider>
    
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<LoginForm  />}/>
                    <Route path="/active" element={<Active />}/>
                    <Route path='search' element={<Login />}/>
                </Routes>
              
    </UserProvider>
            </BrowserRouter>
    </>
  );
}
export default JumiaLogin