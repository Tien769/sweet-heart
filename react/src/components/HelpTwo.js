import './HelpTwo.css';
import React from 'react';

function HelpTwo(){
    return(
        <div className="help">
            {/*HEADER TITLE*/}
            <div>
                <h2 className="menu_home_tilie line_after_heading section_heading">
                    CHÍNH SÁCH BẢO MẬT
                </h2>
            </div>
            {/*BODY*/}
            <div className="help-body">
                <div className="body-1">
                    <h3>KHI NÀO SHOP SẼ THU THẬP DỮ LIỆU CÁ NHÂN?</h3>
                    <p>
                        Chúng tôi sẽ/có thể thu thập dữ liệu cá nhân về bạn: 
                    </p>
                    <ul>
                        <li className="thut">
                            Khi bạn đăng ký và/hoặc sử dụng Các Dịch Vụ hoặc Nền tảng của chúng tôi, hoặc mở một tài khoản với chúng tôi. 
                        </li>
                        <li className="thut"> 
                            Khi bạn gửi bất kỳ biểu mẫu nào, bao gồm, nhưng không giới hạn ở, đơn đăng ký hoặc các mẫu đơn khác liên quan đến bất kỳ sản phẩm và dịch vụ nào của chúng tôi, bằng hình thức trực tuyến hay dưới hình thức khác.
                        </li>
                        <li className="thut">
                            Khi bạn ký kết bất kỳ thỏa thuận nào hoặc cung cấp các tài liệu hoặc thông tin khác liên quan đến tương tác giữa bạn với chúng tôi, hoặc khi bạn sử dụng các sản phẩm và dịch vụ của chúng tôi. 
                        </li>
                        <li className="thut">
                            Khi bạn tương tác với chúng tôi, chẳng hạn như thông qua các cuộc gọi điện thoại (có thể được ghi âm lại), thư từ, fax, gặp gỡ trực tiếp, các nền ứng dụng truyền thông xã hội và email.
                        </li>
                        <li className="thut">
                            Khi bạn sử dụng các dịch vụ điện tử của chúng tôi, hoặc tương tác với chúng tôi qua Nền tảng hoặc Trang Web hoặc Các Dịch Vụ của chúng tôi. Trường hợp này bao gồm, nhưng không giới hạn, thông qua tập tin cookie mà chúng tôi có thể triển khai khi bạn tương tác với các Nền tảng hoặc Trang Web của chúng tôi.
                        </li>
                        <li className="thut">
                            Khi bạn thực hiện các giao dịch thông qua Dịch vụ của chúng tôi.
                        </li>
                        <li className="thut">
                            Khi bạn cung cấp ý kiến phản hồi hoặc gửi khiếu nại cho chúng tôi.
                        </li>
                    </ul>
                    <p>
                        Trên đây chỉ là một số trường hợp phổ biến mà chúng tôi thu thập dữ liệu cá nhân của bạn, không phản ánh hết toàn bộ các trường hợp mà chúng tôi sẽ thu thập dữ liệu cá nhân của bạn. 
                    </p>
                </div>
                <div className="body-2">
                    <h3>SHOP SẼ THU THẬP NHỮNG DỮ LIỆU GÌ?</h3>
                    <p>
                        Dữ liệu cá nhân mà Shop có thể thu thập bao gồm, nhưng không giới hạn:
                    </p>
                    <ol>
                        <li className="thut">
                            Họ tên.
                        </li>
                        <li className="thut"> 
                            Địa chỉ email.
                        </li>
                        <li className="thut">
                            Ngày sinh.
                        </li>
                        <li className="thut">
                            Địa chỉ thanh toán.
                        </li>
                        <li className="thut">
                            Tài khoản ngân hàng và thông tin thanh toán.
                        </li>
                        <li className="thut">
                            Số điện thoại.
                        </li>
                        <li className="thut">
                            Giới tính.
                        </li>
                    </ol>
                    <p>
                        Thông tin được gửi bởi hoặc liên quan đến (các) thiết bị được sử dụng để truy cập vào Các Dịch vụ hoặc Nền tảng của chúng tôi.
                    </p>
                    <p>
                        Bất kỳ thông tin nào khác về người dùng khi người dùng đăng nhập để sử dụng Các Dịch Vụ hoặc Nền tảng của chúng tôi, và khi người dùng sử dụng Các Dịch Vụ hoặc Nền tảng, cũng như thông tin về việc người dùng sử dụng Các Dịch Vụ hoặc Nền tảng của chúng tôi như thế nào và dữ liệu tổng hợp về nội dung người dùng sử dụng.
                    </p>
                    <p>
                        Bạn đồng ý không cung cấp cho chúng tôi bất cứ thông tin nào không chính xác hoặc gây hiểu nhầm và bạn đồng ý sẽ thông báo cho chúng tôi về bất cứ thông tin nào không chính xác hoặc khi có sự thay đổi thông tin. Chúng tôi bảo lưu quyền theo quyết định riêng của chúng tôi được yêu cầu các tài liệu cần thiết khác để xác minh thông tin được bạn cung cấp.
                    </p>
                </div>
                <div className="body-3">
                    <h3>THU THẬP CÁC DỮ LIỆU KHÁC</h3>
                    <p>
                        Như với hầu hết các trang web và các ứng dụng di động khác, thiết bị của bạn gửi thông tin có thể gồm có dữ liệu về bạn, được một máy chủ web ghi lại khi bạn sử dụng Nền tảng của chúng tôi. Thông tin này thường bao gồm nhưng không giới hạn địa chỉ IP, hệ điều hành của máy tính/thiết bị di động, loại trình duyệt, loại thiết bị di động, các đặc điểm của thiết bị di động, mã định danh thiết bị thống nhất (UDID) hoặc mã định danh thiết bị di động (MEID) của thiết bị di động của bạn, địa chỉ tham chiếu của Trang Web (nếu có), các trang mà bạn đã truy cập đến trên trang web hoặc ứng dụng di động của chúng tôi và thời gian truy cập và đôi khi là "cookie" (có thể vô hiệu hóa bằng cách sử dụng tùy chọn trình duyệt của bạn) để giúp trang web ghi nhớ lần truy cập cuối cùng của bạn. Nếu bạn đăng nhập, thông tin này được liên kết với tài khoản cá nhân của bạn. Thông tin này cũng được đưa vào các số liệu thống kê ẩn danh để giúp chúng tôi hiểu được khách truy cập sử dụng Trang Web của chúng tôi như thế nào.
                    </p>
                    <p>
                        Các ứng dụng di động của chúng tôi có thể thu thập thông tin chính xác về địa chỉ của thiết bị di động của bạn sử dụng các công nghệ như GPS, Wi-Fi, … Chúng tôi thu thập, sử dụng, công bố và/hoặc xử lý các thông tin này cho một hoặc nhiều mục đích bao gồm, nhưng không giới hạn, các dịch vụ được cung cấp dựa trên vị trí mà bạn yêu cầu hoặc chuyển các nội dung có liên quan đến bạn dựa trên vị trí của bạn hoặc cho phép bạn chia sẻ vị trí của bạn cho các Người sử dụng khác như là một phần của các Dịch vụ được cung cấp bởi các ứng dụng di động của chúng tôi. Đối với phần lớn các thiết bị di động, bạn có thể rút lại sự cho phép để chúng tôi được thu thập các thông tin này dựa trên vị trí của bạn thông qua các cài đặt trên thiết bị. Nếu bạn có câu hỏi nào về cách thức vô hiệu hóa các dịch vụ vị trí trên thiết bị di động của bạn, vui lòng liên hệ với các nhà cung cấp dịch vụ thiết bị di động hoặc nhà sản xuất thiết bị của bạn.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default HelpTwo;