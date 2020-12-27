import React, { useState, useEffect } from 'react'
import { getAllProductsAsync, getProductImageUrl } from '../lib/backendService';
import './ProductDetail.css';
import { addCartItem, getCartItems } from '../lib/backendService'
export default function ProductDetail(pro) {

  /**
   *  Truyền vào pro {product_id, type, name, price, img}
   *  
   *  Hiện tại thông tin chỉ là sử dụng tạm.
   * 
   */



  const [product, setProduct] = useState({});
  useEffect(() => {
    getAllProductsAsync()
      .then(res => res.product_list)
      .then(list => {
        setProduct(list[3]);
      });
  }, [product])



  /**
   * Xử lý thêm sản phẩm vào giỏ hàng.
   */
  const addToCart_PD = () => {
    console.log("ADD TO CART");
    addCartItem(product);

    // kiểm tra cart - 
    getCartItems()
      .then(res => {
        console.log("--- cart ----");
        console.log(res.cart);
        console.log("--- cart ----");
      })
  }

  // Hàm format lại giá tiền trong  Page/CartPage.js
  const formatPrice = prodPrice => {
    if (prodPrice === 0) return prodPrice;
    let formatPrice = String(prodPrice);
    formatPrice =
      formatPrice.slice(0, formatPrice.length - 3) + ',' + formatPrice.slice(formatPrice.length - 3);
    return formatPrice;
  };

  return (
    <div className="container-fluid">
      <div className="pro_detail">
        <div>
          <title>Bootstrap 4 Footer with Social icons</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link
            rel='stylesheet'
            href='https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
          />
          <link
            href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
            rel='stylesheet'
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet"></link>
        </div>
        <div className="pro_de">


          <div className="row">
            <div className="col-sm-2" />
            <div className="col-sm-4">

              <img src={getProductImageUrl(product.img)} alt="img_" />

            </div>
            <div className="col-sm-4">
              <div className="info_product_wrap">
                <h1 className="imenu_home_tilie line_after_heading section_heading">{product.name}</h1>
                <div className="more_info_product">
                  <p>Sản phẩm được sản xuất trên dây chuyền hiện đại,
                  đáp ứng tiêu chuẩn chất lượng cao và được kiểm soát tiêu chuẩn HACCP.</p>
                  <p><span className="font_w_bold">Số lượng:</span> 100 (trong kho).</p>
                  <p><span className="font_w_bold">Hạn sử dụng:</span> 12 tháng kể từ ngày sản xuất.</p>
                  <p><span className="font_w_bold">Loại:</span> {product.type}.</p>
                </div>
                <form className="form_info_product">

                  <div className="product_price">{formatPrice(parseFloat(product.price) * 1000)} Đ</div>
                  <button className="btn_add_cart" onClick={() => addToCart_PD}>
                    THÊM VÀO GIỎ HÀNG
                    </button>
                </form>
              </div>
            </div>
            <div className="col-sm-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

