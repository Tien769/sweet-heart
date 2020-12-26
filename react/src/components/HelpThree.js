import './HelpThree.css';
import React from 'react';

function HelpThree(){
    return(
        <div className="help">
            {/*HEADER TITLE 1*/}
            <div>
                <h2 className="menu_home_tilie line_after_heading section_heading">
                    CHÍNH SÁCH ĐẶT HÀNG VÀ THANH TOÁN
                </h2>
            </div>
            {/*BODY*/}
            <div className="help-body">
                <div className="body-1">
                    <h3>ĐẶT HÀNG VÀ THANH TOÁN</h3>
                    <p>
                    Vào từng thời điểm, Shop sẽ hỗ trợ một hoặc nhiều phương thức thanh toán như sau: 
                    </p>
                    <ol>
                        <li className="thut">
                        Thẻ Tín Dụng/Ghi Nợ hoặc trả góp bằng thẻ tín dụng: Thanh toán qua thẻ tín dụng/ghi nợ hoặc trả góp bằng thẻ tín dụng được thực hiện thông qua kênh thanh toán của bên thứ ba và danh sách thẻ được chấp nhận phụ thuộc vào kênh thanh toán mà bạn đang sử dụng.
                        </li>
                        <li className="thut"> 
                        Thanh Toán Khi Nhận Hàng (COD): Shop cung cấp dịch vụ COD. Người mua có thể trả tiền mặt trực tiếp cho người vận chuyển vào thời điểm nhận hàng.
                        </li>
                        <li className="thut">
                        Thanh Toán Bằng Thẻ ATM Nội Địa – Internet Banking: Hình thức thanh toán bằng thẻ ATM nội địa – internet banking chỉ dành cho Người Mua có thẻ ATM nội địa có liên kết internet banking (thanh toán trực tuyến) và không áp dụng đối với các thẻ VISA và Mastercard
                        </li>
                    </ol>
                    <p>
                    Người Mua chỉ có thể thay đổi kênh thanh toán trước khi thực hiện thanh toán.
                    </p>
                    <p>
                    Shop không chịu trách nhiệm cũng như nghĩa vụ nào đối với bất kỳ tổn thất hoặc thiệt hại nào mà Người Mua hoặc Người Bán phải chịu từ việc nhập sai thông tin vận chuyển và/hoặc thông tin thanh toán cho đơn hàng đã đặt và/hoặc sử dụng phương thức thanh toán không được liệt kê ở trên. Shop bảo lưu quyền kiểm tra tính hợp pháp quyền sử dụng phương thức thanh toán của Người Mua và có quyền đình chỉ giao dịch cho đến khi xác nhận được tính hợp pháp hoặc hủy các giao dịch liên quan nếu không thể xác nhận tính hợp pháp này.  
                    </p>
                </div>
            </div>

            <div>
                <h2 className="menu_home_tilie line_after_heading section_heading_1">
                    CHÍNH SÁCH VẬN CHUYỂN VÀ ĐỔI TRẢ
                </h2>
            </div>
            {/*BODY*/}
            <div className="help-body">
                <div className="body-1">
                    <h3>VẬN CHUYỂN</h3>
                    <p>
                    Khi vận chuyển thành công đơn hàng, Shop sẽ thông báo đến Người Mua.  
                    </p>
                    <p>
                    Người Sử Dụng hiểu rằng Shop sẽ chịu toàn bộ rủi ro liên quan đến việc vận chuyển hàng hóa được mua và bảo đảm rằng Shop đã hoặc sẽ mua bảo hiểm hàng hóa, bao gồm cả việc vận chuyển.  Trong trường hợp Hàng hóa được mua bị hư hỏng, thất lạc hoặc không chuyển phát được trong quá trình vận chuyển, Shop sẽ không chịu trách nhiệm đối với bất kỳ tổn thất, chi phí, phí tổn hoặc bất kỳ khoản phí nào phát sinh từ sự cố đó Người Mua sẽ liên hệ với đơn vị vận chuyển để giải quyết sự cố đó.
                    </p>
                    <h3>HỦY ĐƠN HÀNG, TRẢ HÀNG VÀ HOÀN TIỀN</h3>
                    <p>
                    Sweet Heart đảm bảo sản phẩm được bán tại Sweet Heartlà sản phẩm mới và 100% chính hãng. Trong trường hợp hiếm hoi sản phẩm quý khách nhận được có khiếm khuyết, hư hỏng hoặc không như mô tả, Sweet Heart cam kết bảo vệ khách hàng bằng chính sách đổi trả và bảo hành tại đây.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HelpThree;