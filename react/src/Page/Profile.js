import React, { useState, useEffect } from 'react';
import './Profile.css';
import {checkOnlyNumber} from '../lib/function'
export default function Profile() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
    })

    const [changePassword, setChangePassword] = useState({
        oldPassword: "",
        newPassword: "",
    })


    const [checked, setChecked] = useState(false);
    const changeCheckBox = e => {
        setChecked(!checked);
    }

    const [errPhone, setErrPhone] = useState("");
    const [errPasswordOld, setErrPasswordOld] = useState("");
    const [errRePassword, setErrRePassword] = useState("");


    const setOldPassword = password => {
        setChangePassword({ ...changePassword, oldPassword: password });
    }

    const setNewPassword = password => {
        setChangePassword({ ...changePassword, newPassword: password });
    }

    const checkRePassword = rePassword => {
        if (rePassword !== "" && rePassword !== changePassword.newPassword) {
            setErrRePassword("Mật khẩu không trùng khớp!!!");
        } else setErrRePassword("");
    }
  

    const checkPhone = phone => {
        phone = String(phone);
        console.log(phone);
        let n = phone.length;
        if (phone === "" || (checkOnlyNumber(phone) && n < 10))
            setUser({ ...user, phone: phone });

        if (n > 0){
            if (phone[0] !== '0') 
                setErrPhone("Vui lòng nhập đúng định dạng. Vd: 0905749999"); 
            else 
                setErrPhone("");
        }
    }


    const submitHandler = e => {
        e.preventDefault();

        /*
        Cập nhật thông tin tài khoản.
        */


        console.log(user);
    }


    return (
        <div>
            <div className="HeaderProfile">
                <p>SWEET HEART</p>
            </div>
            <hr></hr>

            <div className="Profile">
                <form onSubmit={submitHandler}>

                    <div className="form-inner">
                        <h2>
                            THÔNG TIN TÀI KHOẢN
                    </h2>
                        <div className="form-group">
                            <label htmlFor="name"> Họ và Tên: </label>
                            <input type="text" name="name" id="name" onChange={e => setUser({ ...user, name: e.target.value })} value={user.name} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email"> Email: </label>
                            <input type="email" name="email" id="email" onChange={e => setUser({ ...user, email: e.target.value })} value={user.email} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone"> Số điện thoại: </label>
                            <input type="text" name="phone" id="phone" onChange={e => checkPhone(e.target.value)} value={user.phone} />
                        </div>
                        {(errPhone !== "") ? (<div className="errPassword">{errPhone}</div>) : ""}

                        <div className="form-group">
                            <label htmlFor="address"> Địa chỉ: </label>
                            <input type="text" name="address" id="address" onChange={e => setUser({ ...user, address: e.target.value })} value={user.address} />
                        </div>

                        <div>
                            <label className="container">Thay đôi mật khẩu
                        <input type="checkbox" checked={checked} onChange={changeCheckBox} />
                                <span className="checkmark"></span>
                            </label>
                        </div>

                        {(checked) ? (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="password"> Mật khẩu cũ: </label>
                                    <input type="password" name="password" id="password_old" onChange={e => setOldPassword(e.target.value)} />
                                </div>
                                {(errPasswordOld !== "") ? (<div className="errPassword">{errPasswordOld}</div>) : ""}

                                <div className="form-group">
                                    <label htmlFor="password"> Mật khẩu mới: </label>
                                    <input type="password" name="password" id="password_new" onChange={e => setNewPassword(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password"> Nhập lại: </label>
                                    <input type="password" name="password" id="password_c_new" onChange={e => checkRePassword(e.target.value)} />
                                </div>
                                {(errRePassword !== "") ? (<div className="errPassword">{errRePassword}</div>) : ""}

                            </div>

                        ) : ""}

                        <input type="submit" value="Cập nhât" />
                    </div>
                </form>
            </div>
        </div>

    )
}
