import React, { useEffect, useState } from 'react';
import './Purchase.css';
import ProductPurchase from './ProductPurchase.js';
import { BsFillCaretLeftFill } from "react-icons/bs";
import { removeCartItem } from '../lib/backendService';

function Purchase({ users, items, editUser, view, getDelivery }) {

  const n = items.length;
  {/*
    Khi đến trang thanh toán, thông tin của khách hàng (trong hồ sơ cá nhân) sẽ được điền mặc định ở mục Thông tin.
    Tuy nhiên, khách hàng có thể chỉnh sửa được các thông tin này để phù hợp.
  */}
  const [user, setUser] = useState(users);
  useEffect(() => {
    editUser(user);
  }, [user])
  //Lấy tổng tiền của các sản phẩm = tổng (đơn giá * số lượng)
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    let sum = 0;
    items.map((item) => (
      sum = sum + Number(item.price) * Number(item.quantity)
    ));
    setSubtotal(sum);
  }, [subtotal])

  {/*
    khách hàng có thể chọn dịch vụ vận chuyển cho mình. Bao gồm 2 dịch vụ:
      + Vận chuyển nhanh với giá là 25.000đ
      + Vận chuyển tiết kiệm với giá là 21.000đ
  */}
  const [cost, setCost] = useState(25);
  const SetCostFast = () => {
    setCost(25);
  }
  const SetCost = () => {
    setCost(21);
  }

  //Cập nhật lại giá vận chuyển để đưa qua Bill
  useEffect(() => {
    getDelivery(cost);
  }, [cost])

  //Kiểm tra form thông tin: không đc trống
  const [errForm, setErrForm] = useState("");
  const submitHandler = () => {
    if (user.name === "" || user.email === "" || user.address === "" || user.phone === "") {
      setErrForm("Vui lòng nhập đầy đủ thông tin.")
    }
    else {
      setErrForm("");
    }
  }

  //Format số điện thoại
  const [errphone, setErrPhone] = useState("");
  const checkOnlyNumber = (inp) => {
    inp = String(inp);
    let numbers = /^[0-9]+$/;
    if (inp.match(numbers) !== null) return true;
    return false;
  }

  const checkPhone = (phone) => {
    phone = String(phone)
    let n = phone.length;
    if (phone === "" || (checkOnlyNumber(phone) && n < 10))
      setUser({ ...user, phone: phone });

    if (n > 0) {
      if (phone[0] !== '0')
        setErrPhone("Vui lòng nhập đúng định dạng. Vd: 0925363546");
      else
        setErrPhone("");
    }
  }

  //Xóa Item ra khỏi giỏ hàng sau khi đã thanh toán
  const removeCart = () => {
    console.log(n);
    for (let i = 0; i < n; i++) {
      console.log("Xoa");
      removeCartItem(items[i]);
    }
  }

  //Thực hiện Xóa, chuyển sang Hóa đơn
  const Submit = () => {
    submitHandler();
    //Xóa sản phẩm 
    removeCart();
    view(2);
  }

  //Sử dụng để cập nhật lại thông tin khi thay đổi
  useEffect(() => {
    editUser({ user })
  }, [user])
  return (
    <div className="container">
      <form onSubmit={Submit}>
        <div className="contner-title">
          <h1 className="title2">
            <span className="text-address"> THANH TOÁN</span>
          </h1>
        </div>
        <div className="row g-2">
          <div className="payment-step">
            <h4 className="subtitle"> 1.ĐỊA CHỈ THANH TOÁN VÀ VẬN CHUYỂN</h4>
            <div className="step-preview">
              <h2 className="title1">Thông tin thanh toán</h2>
              <div className="info-group">
                <input className="info" placeholder="Họ và tên" onChange={e => setUser({ ...user, name: e.target.value })} value={user.name}></input>
              </div>
              <div className="info-group">
                <input className="info" placeholder="Số điện thoại" onChange={e => checkPhone(e.target.value)} value={user.phone}></input>
              </div>
              {(errphone !== "") ?
                (<div className="errPass">{errphone}</div>) : ""
              }
              <div className="info-group">
                <input type="email" className="info" placeholder="Email" onChange={e => setUser({ ...user, email: e.target.value })} value={user.email}></input>
              </div>
              <div className="info-group">
                <input className="info" placeholder="Địa chỉ" onChange={e => setUser({ ...user, address: e.target.value })} value={user.address}></input>
              </div>
              {(errForm !== "") ?
                (<div className="errPass">{errForm}</div>) : ""
              }
              <h2 className="title1">Phuong thức thanh toán</h2>
              <div className="checkbox-transport">
                <form className="checkbox">
                  <label className="transport-label">
                    <input className="transport" type="radio" name="tran" onClick={SetCostFast} defaultChecked></input>
                Giao hàng nhanh
              </label>
                  <input className="transport" type="radio" name="tran" onClick={SetCost}></input>
                Giao hàng tiết kiệm
            </form>
              </div>
            </div>
          </div>
          <div className="payment-step">
            <h4 className="subtitle"> 2. THÔNG TIN ĐƠN HÀNG</h4>
            <ProductPurchase items={items} />
            <hr></hr>
            <div className="money">
              <h6 className="text-money">Thành tiền
        {((subtotal) % 1 === 0.5) ?
                  (<span className="number-money">
                    {subtotal}00
                    <span className="sub-price">₫</span>
                  </span>) :
                  <span className="number-money">
                    {subtotal}.000
                <span className="sub-price">₫</span>
                  </span>
                }
              </h6>
            </div>
            <hr></hr>
            <div className="money">
              <h6 className="text-money">Phí vận chuyển
        {((cost) % 1 === 0.5) ?
                  (<span className="number-money">
                    {cost}00
                    <span className="sub-price">₫</span>
                  </span>) :
                  <span className="number-money">
                    {cost}.000
                <span className="sub-price">₫</span>
                  </span>
                }
              </h6>
            </div>
            <hr></hr>
            <div className="money">
              <h5 className="text-money" >THANH TOÁN
                {((Number(cost) + Number(subtotal)) % 1 === 0.5) ?
                  (<span className="number-money">
                    {Number(cost) + Number(subtotal)}00
                    <span className="sub-price">₫</span>
                  </span>) :
                  <span className="number-money">
                    {Number(cost) + Number(subtotal)}.000
                <span className="sub-price">₫</span>
                  </span>
                }
              </h5>
            </div>
            <button className="complete-purchase" type="submit" onClick={Submit}>Thanh toán</button>
          </div>
        </div>
        <div className="comback">
          <button type="button" className="back" onClick={() => { view(0) }}>
            <BsFillCaretLeftFill></BsFillCaretLeftFill>
            <span>Quay lại giỏ hàng</span>
          </button>
        </div>
      </form>
    </div>
  );
}
export default Purchase;