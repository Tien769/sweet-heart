import React, { useEffect, useState } from 'react';
import './Purchase.css';
import { getProductImageUrl } from '../lib/backendService.js';

//chỉ hiện 35 kí tự đầu trong tên sản phẩm
const MAX_LENGTH = 35;
export default function ProductPurchase({items}){
    return items.map((item) => (
        <div key={item.product_id} className="product-info">
          <div className="container-img-product">
            <img className="img-product" src={getProductImageUrl(item.img)}></img>
          </div>
          <div>
          {(item.name.length > MAX_LENGTH) ?
              (<div className="name-product">
              { `${item.name.substring(0, MAX_LENGTH)}... x ${item.quantity}`}
            </div>) :
              <div className="name-product">
              {item.name} x {item.quantity}
              </div>
            }
            {(Number(item.price)*Number(item.quantity) % 1 === 0.5) ?
              (<span className="price">
                {Number(item.price)*Number(item.quantity)}00
                <span className="sub-price">₫</span>
              </span>) :
              <span className="price">
                {Number(item.price)*Number(item.quantity)}.000
                <span className="sub-price">₫</span>
              </span>
            }
        </div>
      </div>
    ));
}