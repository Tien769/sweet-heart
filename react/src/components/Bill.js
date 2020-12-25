import { useEffect, useState } from 'react';
import './Bill.css';
import ItemBill from './ItemBill.js';

{/**Vấn đề: Không thể in ra thông tin của khách hàng mặc dù đã truyền user??? */}

function Bill ({items, user, delivery, today, view}){
   
const [inforUser, setInforUse] = useState(user);
useEffect(() =>{
    setInforUse(user)
}, [user])
    const [subtotal, setSubtotal] = useState(0);
    useEffect(() => {
        let sum = 0;
        items.map((item) => (
        sum = sum + Number(item.price) * Number(item.quantity)
        ));
        console.log("WR user:");
        console.log(user);
        setSubtotal(sum);
    }, [subtotal])

    //vì không sử dụng được thông tin user truyền vào nên xài tạm cái này
      const user1 = {
        email: 'phuong@gmail.com',
        name: 'Nguyen Thi Phuong',
        address: 'khu phố 6, phường Linh Trung, quận Thử Đức, tp.HCM',
        phone: '0941765863',
      }
    
    
    
    return(
        <div className="container">
            <div className="payment-order">
                <h3 className="title-bill">HÓA ĐƠN</h3>
                <h5>Thông tin khách hàng: </h5>
                <p className="container-info">
                  
                    <div className="info-custem">Họ và tên: {inforUser.name}</div>
                    <div className="info-custem">Số điện thoại: {inforUser.phone}</div>
                    <div className="info-custem">Địa chỉ giao hàng: {inforUser.address}</div>
                </p>
                <p>
                    <h6>
                        Ngày đặt: 
                        <span className="data-time"> {today}</span>
                    </h6>
                </p>
                <p>
                    <h6>
                        {/**in ra dịch vụ thanh toán */}
                        Phương thức thanh toán: 
                        {(Number(delivery) === 25) ?
                            (<span className="data-time"> Đặt hàng nhanh</span>) :
                            <span className="data-time"> Đặt hàng tiết kiệm</span>
                        }
                    </h6>
                </p>
                <h5>Thông tin đơn hàng</h5>
                <table className="table"> 
                    <thead>
                        <tr>
                            <th className="stt">STT</th>
                            <th className="product">Sản phẩm</th>
                            <th className="price-item">Đơn giá</th>
                            <th className="num-item">Số lượng</th>
                            <th className="subtotal">Thành tiền</th>
                        </tr>
                    </thead>
                </table>
                <table className="table1">
                    <ol className="table1">
                    <ItemBill items={items}/>
                    </ol>
                </table>
                <div className="total">
                <h6>TỔNG THANH TOÁN:  
                {((Number(subtotal)+ Number(delivery))  % 1 === 0.5) ?
                  (<span>
                       {Number(subtotal)+ Number(delivery)}00
                        <span className="sub-price">₫</span>
                  </span>) :
                  <span>
                       {Number(subtotal)+ Number(delivery)}.000
                        <span className="sub-price">₫</span>
                  </span>
                }
                </h6>
                </div>
            </div>
            <div className="back">
                <div>
                    <button className="button-back-home" type="button" onClick={() => { view(0) }}>Tiếp tục mua hàng</button>
                </div>
            </div>
        </div>
    );
}
export default Bill