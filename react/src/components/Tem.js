import { useEffect, useState } from 'react';
import './Bill.css';
import './Purchase.css';
import './Admin.css';
import { getProductImageUrl } from '../lib/backendService';
//Đây tượng trưng cho giỏ hàng

const MAX_LENGTH = 25;
function Tem({ allCart, getListPurchase }) {
  
  //cập nhật danh sách các sản phẩm được chọn để thanh toán và đưa qua cho PageCart.js
  const [purchase, setPurchase] = useState([]);
  useEffect(()=>{
    getListPurchase(purchase);
  }, [purchase])


  return allCart.map((item) => (
    <div key={item.product_id} className="product-info-admin">
      <input type="checkbox" className="edit-delete-info"

/*
Ý tưởng: (đối với mỗi sản phẩm)
ở đây sẽ tạo ra một mảng tạm có giá trị là mảng truyền vào từ PageCart.
Nếu danh sách là mảng rỗng thì khi onClick thì sẽ auto push(item) vào mảng.
Ngược lại, thì chúng ta kiểm tra xem nó đã tồn tại trong mảng 
danh sách được chọn không? Nếu tồn tại thì có nghĩa là khách hàng đã nhấn bỏ chọn
=> Xóa nó khỏi danh sách. Nếu ko tồn tại thì push nó vào.
Sau khi thực hiện xong thì cập nhật lại mảng truyền vào.
*/
        onClick={() => {
          let tempList = purchase;
          if (tempList === null) {
            tempList = [];
          }
          if (tempList.length != 0) {
            //console.log("vao push 2")
            let index1 = tempList.length;
            for (let i = 0; i < index1; i++) {
              if (tempList[i].product_id === item.product_id) {
                //console.log("trung");
                tempList.splice(i, 1);
                setPurchase(tempList);
                return 0;
              }
            }
            tempList.push(item);
            console.log("true");
          } else {
            tempList.push(item);
          }
          setPurchase(tempList);
        }}></input>
      <div className="container-img-product">
        <img className="img-product-admin" width="100% /9" height="100% /10" src={getProductImageUrl(item.img)}></img>
      </div>
      <div>
        {(item.name.length > MAX_LENGTH) ?
          (<div className="name-product-admin">
            { `${item.name.substring(0, MAX_LENGTH)}...`}
          </div>) :
          <div className="name-product-admin">
            {item.name}
          </div>
        }
        {(Number(item.price) % 1 === 0.5) ?
          (<span className="price-admin">
            {Number(item.price)}00
            <span className="sub-price">₫</span>
          </span>) :
          <span className="price-admin">
            {Number(item.price)}.000
                <span className="sub-price">₫</span>
          </span>
        }
        <div className="button-edit-admin">
          <button className="edit-product-admin" type="button"> Sửa</button>
          <button className="edit-product-admin" type="button">Xóa</button>
        </div>
      </div>
    </div>
  ));
}
export default Tem;
