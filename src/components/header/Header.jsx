import React from "react";
import { FaShoppingCart, FaUser, FaQuestionCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import "./header.css";

const Header = () => {

  
  return (
    <header className="header">
      {/* الشريط العلوي */}
      <div className="top-bar">
        <div className="language-switch">
          <span>عربي</span> | <span>English</span>
        </div>
        <a href="#" className="sell-link">بيع على جوميا</a>
      </div>

      {/* الشريط الرئيسي */}
      <div className="main-header">
        {/* اللوجو */}
        <div className="logo">
          JUMIA<span className="star">★</span>
        </div>

        {/* شريط البحث */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="البحث عن منتجات، والعلامات التجارية، والأقسام"
          />
          <button>
            <FiSearch /> البحث
          </button>
        </div>

        {/* العناصر اليمنى */}
        <div className="header-right">
          <div className="cart">
            <FaShoppingCart />
            <span>Cart </span>
          </div>
          <div className="help">
            <FaQuestionCircle />
            <span>Help</span>
          </div>
          <div className="user">
            <FaUser />
            <span>Hi, Elmokhtar</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
