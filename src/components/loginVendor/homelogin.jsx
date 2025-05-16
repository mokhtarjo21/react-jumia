
import React, { useState,useContext, useEffect } from "react";

import Login from "./login";
import Register from "./register";
import Active from "./step2";
import ActiveCode from "./step3"
import PersonalDetailsForm from "./step4";
import AddPassAndPhone from "./step5";
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
                    <Route path="step2" element={<Active />}/>
                    <Route path='step3' element={<ActiveCode />}/>
                    <Route path='step4' element={<PersonalDetailsForm />}/>
                    <Route path='step5' element={<AddPassAndPhone />}/>
                </Routes>
              
    </UserProvider>
           
    </>
  );
}
export default JumiaLogin