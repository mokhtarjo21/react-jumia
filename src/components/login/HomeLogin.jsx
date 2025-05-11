
import React, { useState } from "react";

import Login from "./Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function JumiaLogin() {
  

  return (
    <>
    <Login />
{/* 
<BrowserRouter>
           
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="" element={<Login />}/>
                    <Route path="favorit" element={<Login />}/>
                    <Route path='search' element={<Login />}/>
                </Routes>
              
            </BrowserRouter> */}
    </>
  );
}
export default JumiaLogin