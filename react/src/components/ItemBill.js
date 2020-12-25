import { useEffect, useState } from 'react';
import './Bill.css';


//đây là component để hiện danh sách các sản phẩm ở trong hóa đơn
const MAX_LENGTH=50;
function ItemBill({items}){
    
    return items.map((item) => (
        <tbody className="tbody-table1">
            <tr>
                <td className="stt1">
                    <li/>
                </td>
                <td className="product1">
                    {(item.name.length > MAX_LENGTH) ?
                    (<span>
                    { `${item.name.substring(0, MAX_LENGTH)}...`}
                    </span>) :
                    <span>{item.name}</span>}
                </td>
                {(item.price % 1 === 0.5) ?
                    (<td className="price-item1">
                        {item.price}00
                        <span className="sub-price">₫</span>
                    </td>) :
                     <td className="price-item1">
                        {item.price}.000
                        <span className="sub-price">₫</span>
                    </td>
                }
                <td className="num-item1">{item.quantity}</td>
                {(Number(item.price)*Number(item.quantity) % 1 === 0.5) ?
                    (<td className="subtotal1">
                        {Number(item.price)*Number(item.quantity)}00
                         <span className="sub-price">₫</span>
                    </td>) :
                    <td className="subtotal1">
                        {Number(item.price)*Number(item.quantity)}.000
                        <span className="sub-price">₫</span>
                    </td>
                 }
            </tr>
        </tbody>));
}
export default ItemBill