import React from 'react'
import './Footer.css'
import vanChuyen01 from './img-footer/vanchuyen01.png';
import vanChuyen02 from './img-footer/vanchuyen02.png';
import vanChuyen03 from './img-footer/vanchuyen03.png';
import vanChuyen04 from './img-footer/vanchuyen04.png';
import thanhToan01 from './img-footer/thanhtoan01.png';
import thanhToan02 from './img-footer/thanhtoan02.png';
import thanhToan03 from './img-footer/thanhtoan03.png';

function Footer() {
    return (
        <div>
            <div>
                <title>Bootstrap 4 Footer with Social icons</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" />
                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
                <footer className="mainfooter" role="contentinfo">
                    <div className="footer-middle">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-3 col-sm-6">
                                    {/*Column1*/}
                                    <div className="footer-pad">
                                        <p className="heading">GIỚI THIỆU</p>

                                        <ul className="list-unstyled">
                                            <li><a href="#" /></li>
                                            <li><a href="#">VỀ SWEET HEART</a></li>
                                            <li><a href="#">HƯỚNNG DẪN ĐẶT HÀNG</a></li>
                                            <li><a href="#">LIÊN HỆ</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    {/*Column1*/}
                                    <div className="footer-pad">
                                        <p className="heading">CHÍNH SÁCH</p>
                                        <ul className="list-unstyled">
                                            <li><a href="#" /></li>
                                            <li><a href="#">CHÍNH SÁCH VÀ QUY ĐỊNH CHUNG</a></li>
                                            <li><a href="#">CHÍNH SÁCH VẬN CHUYỂN VÀ ĐỔI TRẢ</a></li>
                                            <li><a href="#">CHÍNH SÁCH BẢO MẬT THÔNG TIN</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6">
                                    {/*Column1*/}
                                    <div className="footer-pad">
                                        <p className="heading">CÓ THẮC MĂC ?</p>
                                        <ul className="list-unstyled">
                                            <li><a href="#" /></li>
                                            <li><a href="#">TƯ VẤN THẮC MẮC (9:00 - 18:00)</a></li>
                                            <li><a href="#">- (028) 1111 2222 </a></li>
                                            <li><a href="#">- (028) 3333 4444</a></li>
                                            <li><a href="#">GÓP Ý, KHIẾU NẠI (9:00 - 18:00)</a></li>
                                            <li><a href="#">- (028) 1111 2222</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <p className="heading">THEO DÕI CHÚNG TÔI</p>
                                    <ul className="social-network social-circle">
                                        <li><a href="#" className="icoFacebook" title="Facebook"><i className="fa fa-facebook" /></a></li>
                                        <li><a href="#" className="icoLinkedin" title="Linkedin"><i className="fa fa-linkedin" /></a></li>

                                    </ul>
                                </div>
                            </div>
                           
                         
                        </div>
                        <div className="end">
                                    <div className="col-md-12 copy">
                                        <p className="text-center">© Copyright 2020 - Sweet Heart.</p>
                                    </div>
                            </div>
                    </div>
                                    </footer>
            </div>
        </div>
    )
}

export default Footer
