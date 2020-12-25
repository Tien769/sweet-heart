import React from 'react'
import img_test from './img-test/hinh.jpg'
import './DetailProduct.css'
import 'bootstrap/dist/css/bootstrap.css';
import {getProductImageUrl} from '../lib/backendService';
export default function DetailProduct() {
    return (
        <div>
            <div>
                <div className="container-fluid">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-2" />
                            <div className="col-sm-4">
                                <div className="img_product">
                                    <img src={getProductImageUrl(1)} alt="" />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="info_product_wrap">
                                    <h1 className="imenu_home_tilie line_after_heading section_heading">CAPPUCCINO</h1>
                                    <div className="more_info_product">
                                        <p>Cappuccino được gọi vui là thức uống "một-phần-ba" - 1/3 Espresso, 1/3 Sữa nóng, 1/3
                                        Foam.</p>
                                    </div>
                                    <div className="product_price">45,000 đ</div>
                                    <button className="btn_add_cart">
                                            THÊM VÀO GIỎ HÀNG
                                    </button>
                                </div>
                            </div>
                            <div className="col-sm-2" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
