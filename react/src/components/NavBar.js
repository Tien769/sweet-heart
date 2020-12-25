import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { BiCartAlt } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { searchProductAsync } from '../lib/backendService';
import './NavBar.css';

 function NavBar() {
  const [search, setSearch] = useState(""
  );

  const onSearch = txt => {
    setSearch(txt);

    console.log("s: " + txt);
  }

  const getProduct = () =>{
    console.log("getProduct()");
    
    searchProductAsync({
      name: String(search),
    })
      .then(res => {
        console.log(res)
      })

  }
      return (
        <div className="container">
          <div className="logo"> 
          <button type="button" className="but-logo">Sweet heart</button>
          </div>
          <div className="home">
            <button type="button" className="but-home">TRANG CHỦ</button>
          </div>
          <div className="products">
            <button type="button" className="but-product" >SẢN PHẨM</button>
          </div>
          <div className="help">
            <button type="button" className="but-help">HỔ TRỢ</button>
          </div>
          <div className="contract">
            <button type="button" className="but-contract">LIÊN HỆ</button>
          </div>
          <div className="search-box">
            <input type="text" id="search-txt" className="search-txt" maxLength="50" namr placeholder="Search ..."  onChange={e => onSearch(e.target.value)}/>
            <a href="#" className="search-btn">
            <button className="but-search" type="button" onClick={getProduct}><FaSearch className="icon-search"></FaSearch></button>
            </a>
          </div>
          <a className="cart" href>
            <button className="but-cart" type="button"><BiCartAlt className="icon-cart"></BiCartAlt></button>
          </a>
          <div className="dropdown">
          <a className="sign-up-in" href>
            <span className="image-1"><FaUserCircle></FaUserCircle></span>
            <div className="dropdown-content">
              <button type="button" className="but-use">Hồ sơ cá nhân</button>
              <button type="button" className="but-use">Đăng xuất</button>
            </div>
            <button className="sign">Đăng nhập/Đăng ký</button>
          </a>
          </div>
        </div>
      );
}

export default NavBar;
