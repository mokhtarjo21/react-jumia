
import React, { useState,useContext, useEffect } from "react";
import LoginForm from "./Loginpass";
import Login from "./Login";
import Active from "./active";
import { instance } from "../../axiosInstance/instance";
import { UserProvider } from '../../Context/user';
import PersonalDetailsForm from "./userInfo2";
import AddPassword from "./userInfo1";
import AddNameAndPhone from "./userInfo3";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function JumiaLogin() {
  
  useEffect(() => {
    const checkuser = async () => {
      
       const response = await instance.get("/users/api/",);
       const csrfToken = response.data.csrfToken;
       document.cookie = `csrfToken=${csrfToken}; path=/; secure; samesite=strict`;
    };
    checkuser();
}, []);
  return (
    <>
  


<UserProvider>
    
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="login" element={<LoginForm  />}/>
                    <Route path="active" element={<Active />}/>
                    <Route path='info1' element={<AddPassword />}/>
                    <Route path='info2' element={<PersonalDetailsForm />}/>
                    <Route path='info3' element={<AddNameAndPhone />}/>
                </Routes>
              
    </UserProvider>
           
    </>
  );
}
export default JumiaLogin