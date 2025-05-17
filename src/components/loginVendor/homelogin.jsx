
import React, { useState,useContext, useEffect } from "react";

import Login from "./login";
import Register from "./register";
import { instance } from "../../axiosInstance/instance";
import { UserProvider } from '../../Context/user';
import { BrowserRouter, Route, Routes } from "react-router-dom";
function JumiaLogin() {
  

  return (
    <>
  


<UserProvider>
    
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="register" element={<Register  />}/>
                    {/* <Route path="active" element={<Active />}/>
                    <Route path='info1' element={<AddPassword />}/>
                    <Route path='info2' element={<PersonalDetailsForm />}/>
                    <Route path='info3' element={<AddNameAndPhone />}/> */}
                </Routes>
              
    </UserProvider>
           
    </>
  );
}
export default JumiaLogin