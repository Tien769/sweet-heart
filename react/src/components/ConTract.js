import './ConTract.css';
import React from 'react';
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

function ConTract(){
    return(
        <div className="Lien-he">
            {/*HEADER TITLE*/}
            <div>
                <h2 className="menu_home_tilie line_after_heading section_heading">
                    SWEET HEART
                </h2>
            </div>
            {/*INFOMATION CONTRACT*/}
            <div className="contract">
                {/*INFOMATION CONTRACT 1*/}
                <div className="contract-1">
                    <button className="but-contract-1">
                        <span className="title-1">
                            SWEET HEART
                        </span>
                        <br/>
                        <p className="address-1">
                            CN1: 20/90A, tổ 10, khu phố 6, phường Linh Trung, quận Thủ Đức, Thành phố Hồ Chí Minh
                        </p>
                        <br/>
                        <p className="telephone-1">
                            <FaPhoneAlt></FaPhoneAlt> 0905769999
                        </p>
                        <br/>
                        <p className="mail-1">
                            <FaEnvelope></FaEnvelope> sweetheart@gmail.com
                        </p>
                        <br/>
                    </button>
                </div>
                {/*INFOMATION CONTRACT 2*/}
                <div className="contract-2">
                    <button className="but-contract-2">
                        <span className="title-2">
                            SWEET HEART
                        </span>
                        <br/>
                        <p className="address-2">
                            CN1: 20/90A, tổ 10, khu phố 6,phường Linh Trung, quận Thủ Đức, Thành phố Hồ Chí Minh
                        </p>
                        <br/>
                        <p className="telephone-2">
                            <FaPhoneAlt></FaPhoneAlt> 0344445655
                        </p>
                        <br/>
                        <p className="mail-2">
                            <FaEnvelope></FaEnvelope> sweetheart@gmail.com
                        </p>
                        <br/>
                    </button>
                </div>
            </div>
             {/*NỘI DUNG*/}
            <div className="title-mes">
                <br/> <br/> <br/><br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
                <span>
                    Nếu quý khách có thắc mắc, ý kiến phản hồi hay đóng góp, xin vui lòng điền vào form dưới đây và gửi cho chúng tôi.
                </span>
                <br/>
                <span>Xin chân thành cảm ơn!</span>
            </div>
            <p className="title-table">XIN KHÁCH HÀNG HÃY NHẬP THÔNG TIN VÀO CÁC Ô BÊN DƯỚI</p>
            {/*TABLE*/}
            <table>
                <tr>
                    <td>
                        <input type="text" id="name" className="name" maxLength="40" namr placeholder="Họ và tên"/>
                    </td>
                    <td>
                        <input type="text" id="mail" className="mail" maxLength="40" namr placeholder="Email"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="text" id="addree" className="addree" maxLength="100" namr placeholder="Địa chỉ"/>
                    </td>
                    <td>
                        <input type="text" id="phone" className="phone" maxLength="10" namr placeholder="Số điện thoại"/>
                    </td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <input type="text" id="table-title" className="table-title" maxLength="100" namr placeholder="Tiêu đề"/>
                    </td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <input type="text" id="body" className="body" maxLength="500" namr placeholder="Nội dung"/>
                    </td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <button className="but-gui" type="submit">GỬI</button>
                    </td>
                </tr>
            </table>
        </div>
    );

}

export default ConTract;