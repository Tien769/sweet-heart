import React, { useState, useEffect } from 'react'
import './Profile.css'
import avt from './avt.jpg'

import {authenticateAsync, checkAuthenticationAsync, updateAccountAsync} from '../lib/backendService'

/**
 * Đã cập nhật thành công ---
 * Chưa kiểm tra lại thông tin thay đổi khi cập nhật!!!
 */

function Profile() {
    const [user, setUser] = useState({})

    // const SignIn = () => {
    //     console.log("SIGN IN");
    //     authenticateAsync(
    //         {
    //           email: 'hoangnhutsp@gmail.com',
    //           password: ''
    //         },
    //         'signin'
    //       );
    // }
    useEffect(() => {
        checkAuthenticationAsync()
        .then(res => {
            setUser(res.user);
        })
    }, [user.email])

    const submitHandler = e => {
        e.preventDefault();
        console.log("UPDATE: ");
        console.log(user);
        updateAccountAsync(user)
        .then(res => {
            console.log(res);
        })
    }
    return (
        <div>

        <div className="Profile">
            {/** FORM   */}
            <form onSubmit={submitHandler}>
                <div className="form-inner">

               
                <h2> HỒ SƠ CÁ NHÂN</h2>
                <div className="form-group">
                    <img className="avt" src={avt} alt="Avatar"></img>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Họ và tên:</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name"
                        onChange={e => setUser({...user, name: e.target.value})}
                        value={user.name}
                        autoComplete='off'
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input 
                        type="text" 
                        name="email" 
                        id="email"
                        // onChange={console.log("EMAIL")}
                        value={user.email}
                        autoComplete='off'
                        required
                        readOnly
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Số điện thoại:</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name"
                        onChange={e => setUser({...user, phone: e.target.value})}
                        value={user.phone}
                        autoComplete='off'
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Địa chỉ: </label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name"
                        onChange={e => setUser({...user, address: e.target.value})}
                        value={user.address}
                        autoComplete='off'
                        required
                    />
                </div>
                <input type="submit" value="CẬP NHẬT" />

                </div>
            </form>
        </div>
        </div>
    )
}

export default Profile;
