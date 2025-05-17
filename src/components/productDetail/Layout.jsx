// src/components/Layout.jsx
import React from 'react';
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />

      <main className="container my-4">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;
