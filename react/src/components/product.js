import React, { useState } from 'react';
import './product.css'
import { BiCart } from 'react-icons/bi';
import { BiChevronDownCircle } from 'react-icons/bi'
import { getProductImageUrl } from '../lib/backendService.js';
import Modal from 'react-modal';

const MAX_LENGTH = 25;
export default function Products({items}) {

  const [modalIsOpen,setIsOpen] = useState(false);
  function notification(){
    setIsOpen(true);
    setTimeout(function() {setIsOpen(false)}, 1000);
  }

  return items.map((item) => (
  <div key={item.product_id} className="col-md-3">
    <div className="div1">
      <div className="card">
        <div className="img-container">
          <div className="d-flex justify-content-between align-items-center p-2 first">
            <span></span>
            <button className="shoppingCart" type="button" onClick={notification}>
              <BiCart></BiCart>
            </button>
          </div>
          <img className="img-fluid_dev" width="100% /9" height="100% /9" src={getProductImageUrl(item.img)} alt=''></img>
        </div>

        <div className="detail-container">
          <div className="d-flex justify-content-between align-items-center">
            {(item.name.length > MAX_LENGTH) ?
              (<h6 className="text" >
                { `${item.name.substring(0, MAX_LENGTH)}...`}
              </h6>) :
              <h6 className="text" >{item.name}</h6>
            }
            {(Number(item.price) % 1 === 0.5) ?
              (<span className="text-danger font-weight-bold">
                {item.price}00
                <span className="sub">₫</span>
              </span>) :
              <span className="text-danger font-weight-bold">
                {item.price}.000
                            <span className="sub">₫</span>
              </span>
            }
          </div>
          <div className="mt-3">
            <button className="btn btn-danger btn-block">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
    <Modal isOpen={modalIsOpen} overlayClassName="overlay" className="notifica">
        <BiChevronDownCircle className="BiChevronDownCircle"></BiChevronDownCircle>
        <div className="text-notifica">Sản phẩm đã được thêm vào giỏ hàng</div>
    </Modal>
  </div>
  ));
}