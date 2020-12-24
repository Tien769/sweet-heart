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
          <button className="but-logo">Sweet heart</button>
          </div>
          <div className="home">
            <button className="but-home">TRANG CHỦ</button>
          </div>
          <div className="products">
            <button className="but-product" >SẢN PHẨM</button>
          </div>
          <div className="help">
            <button className="but-help">HỔ TRỢ</button>
          </div>
          <div className="contract">
            <button className="but-contract">LIÊN HỆ</button>
          </div>
          <div className="search-box">
            <input type="text" id="search-txt" className="search-txt" maxLength="50" namr placeholder="Search ..."  onChange={e => onSearch(e.target.value)}/>
            <a href="#" className="search-btn">
            <button className="but-cart" type="button" onClick={getProduct}><FaSearch className="icon-cart"></FaSearch></button>
            </a>
          </div>
          <a className="cart" href>
            <button className="but-cart"><BiCartAlt className="icon-cart"></BiCartAlt></button>
          </a>
          <div className="dropdown">
          <a className="sign-up-in" href>
            <span className="image-1"><FaUserCircle></FaUserCircle></span>
            <div className="dropdown-content">
              <button className="but-use">Hồ sơ cá nhân</button>
              <button className="but-use">Đăng xuất</button>
            </div>
            <span className="sign">Đăng nhập/Đăng ký</span>
          </a>
          </div>
        </div>
      );
}

export default NavBar;
