import React, { useState } from 'react';
import LoginForm from '../Components/LoginForm';
import RegisterForm from '../Components/RegisterForm'
import './Login.css';

import { authenticateAsync } from '../lib/backendService';


function Login() {

    // Tài khoản demo
    const adminUser = {
        name: "Nhut",
        email: "hoangnhutsp@gmail.com",
        password: "111"
    }

    // 1 : Đăng nhập
    // 0 : Đăng ký
    const _isLogin = 1;

    const [authenticated, setAuthenticated] = useState(0);


    const [error, setError] = useState("");
    const [isLogin, setIsLogin] = useState(_isLogin);


    // Kiểm tra thông tin đăng nhập
    const Login = details => {
        console.log("Login: ");
        console.log(details);

        authenticateAsync(details, 'signin')
            .then(res => {
                console.log(res);
                setAuthenticated(res.authenticated);
            })
            .catch(err => {
                setError(err.error);
            });
    }

    // Thay đổi từ đăng nhâp thành đăng kí và ngược lại.
    const updateIsLogin = () => {
        setIsLogin(1 - isLogin);
        setError("");
        console.log(isLogin);
    }


    //Kiểm tra thông tin đăng kí
    // info = {name: "", email: "", password: ""}
    const Register = info => {
        console.log(info);
        authenticateAsync(info, 'signup')
            .then(res => {
                console.log(res);
                setAuthenticated(res.authenticated);
            })
            .catch(err => {
                setError(err.error);
            });

    }



    // Xử lý sau khi đăng nhập hoặc đăng kí thành công.
    const xuLyThanhCong = () => {
        return (
            <div>
                HELLO
            </div>
        )
    }

    return (

        < div>
            <div className="HeaderLogin">
                <p>SWEET HEART</p>
                
            </div>
            <hr></hr>
            <div className="Login">
                {(authenticated !== 0) ? (xuLyThanhCong) :
                    ((isLogin === 1) ? (
                        <LoginForm updateIsLogin={updateIsLogin} Login={Login} error={error} />

                    ) : (
                            <RegisterForm updateIsLogin={updateIsLogin} Register={Register} error={error} />
                        ))
                }
            </div>

        </div >

    )
}

export default Login
