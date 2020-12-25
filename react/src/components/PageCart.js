import { useEffect, useState } from 'react';
import './Bill.css';
import './Purchase.css';
import './Admin.css';
import { getAllProductsAsync } from '../lib/backendService';
import { getCartItems } from '../lib/backendService';
import { addCartItem } from '../lib/backendService';
import { authenticateAsync } from '../lib/backendService'
import { setCartItemQuantity } from '../lib/backendService'
import Tem from './Tem.js';
import Purchase from './Purchase.js';
import Bill from './Bill.js';

{/*
  Đây là component chính để điều phối 3 component: Giỏ hàng, Thanh toán và Hóa đơn.
  Các hàm như sigUp, signin, addItem, setAllProduc chỉ dùng để test.
  test_users: đây là lấy thông tin user nhưng do chưa có hàm nên gán đại.
*/}

function PageCart() {

//set dịch vụ vận chuyển để truyền cho hóa đơn
const [delivery, setDelivery] = useState(25);
const getDelivery = deli =>{
    setDelivery(deli);
}

//lấy ngày hiện tại để in ra tại hóa đơn
const [today, setToday] = useState("")
useEffect(() => {
    let _today = new Date();
    let date = _today.getDate() + "/" + (_today.getMonth()+1) + "/" + _today.getFullYear();
    setToday(date);
}, [today])

const sigUp = () => {
    authenticateAsync(
        {
          email: 'some_email@gmail.com',
          name: 'phuong',
          address: 'Vietnam',
          phone: '012376809',
          password: 'secure_password',
        },
        'signup'
      );
}

const signin = () => {
    authenticateAsync(
        {
          email: 'some_email@gmail.com',
          password: 'secure_password',
        },
        'signin'
      )
      .then(res => {
          console.log(res)
      })
}

const test_users = {
    email: 'phuong@gmail.com',
    name: 'Nguyen Thi Phuong',
    address: 'khu phố 6, phường Linh Trung, quận Thử Đức, tp.HCM',
    phone: '0941765863',
  }

//set view.
const [display, setDisplay] = useState(0);
const SetDisplay = page => {
    setDisplay(page);
}

const [inforuser, setUser] = useState({});
const InfoUser = () =>{
    setUser(test_users);
}

const editInfoUser = edituser =>{
    setUser(edituser);
}

  const [allProduct, setAllProduc] = useState([]);
  useEffect(() =>{
      getAllProductsAsync()
        .then(res => {
          //console.log(res)
          setAllProduc(res.product_list)
        })
  }, [allProduct])

  //lấy thông tin card.
  const [allCart, setAllCart] = useState([]);
  useEffect(() =>{
    getCartItems()
      .then(res => {
        setAllCart(res.cart)
      })
  }, [allCart])

  //test
  const addItem = ()=>{
    addCartItem(allProduct[1]);
  }

  //lấy danh sách các sản phẩm được chọn để thanh toán
const [listPurchase, setListPurchase] = useState([])
  const getListPurchase = listPhuong =>{
    setListPurchase(listPhuong)
  }




  return (
    <div>
      {/**test */}
        <button type="button" onClick={signin}> signin</button>
        <button type="button" onClick={addItem}>Add Item</button>

        {/**Set giao diện cho nó, đầu tiên sẽ là Giỏ hàng, tiếp đến là đến với Thanh Toán và cuối cùng là Hóa đơn */}
        {(display === 0) ?
            (<div>
                <div className="row g-2">
                    <Tem allCart={allCart} getListPurchase={getListPurchase}></Tem>
                </div>
                <button type="button" onClick = {() => {
                    SetDisplay(1);
                    InfoUser();
                    }}>Thanh toán</button>
            </div>) :
            (display === 1) ?
                (<div>
                    <div className="row g-2">
                        <Purchase users={inforuser} items={listPurchase} editUser={editInfoUser} view = {SetDisplay} getDelivery={getDelivery}></Purchase>
                    </div>
                    <button type="button" onClick = {() => SetDisplay(1)}>Thanh toán</button>
                </div>) :
                <Bill items={listPurchase} user={inforuser} delivery={delivery} today={today} view = {SetDisplay}></Bill>
            
        }
                    
    </div>
);
}
export default PageCart;
