// src/components/Layout.jsx
import React from 'react';
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { Outlet } from 'react-router-dom';
import styles from './layout.module.css';
import  FooterPrime  from "../NewFooters/FooterPrime";
import Chat from "../chatbot/chat"
const Layout = () => {
  return (
    <>
      <Header />

      <main className={`${styles.mainContainer} my-auto`}>
        <Outlet />
      </main>

      {/* <Footer /> */}
      <Chat />
      <FooterPrime />
    </>
  );
};

export default Layout;
