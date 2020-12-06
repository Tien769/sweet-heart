import React, {useState} from 'react';
import LoginForm from '../Components/LoginForm';
import RegisterForm from '../Components/RegisterForm'
import './Login.css';

import {authenticateAsync} from '../lib/backendService';



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

    const [user, setUser] = useState({name: "", email: ""});


    const [error, setError] = useState("");
    const [isLogin, setIsLogin] = useState(_isLogin);


    // Kiểm tra thông tin đăng nhập
    const Login = details => {
        console.log(details);

       
        /*
        authenticateAsync(details, 'signin')
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log("ERR: " + err);
        });

        */

        if (details.email == adminUser.email && details.password == adminUser.password){
            console.log("Đăng nhập thành công");
            setError("");
            setUser({
                name : adminUser.name,
                email : details.email
            })
        } else {
            console.log("Sai tài khoản hoặc mật khẩu");
            setError("Sai tài khoản hoặc mật khẩu !")
        }
    }

    // Thay đổi từ đăng nhâp thành đăng kí và ngược lại.
    const updateIsLogin = () => {
        setIsLogin(1-isLogin);
        setError("");
        console.log(isLogin);
    } 


    //Kiểm tra thông tin đăng kí
    // info = {name: "", email: "", password: ""}
    const Register = info => {
        console.log(info);

        // Kiểm tra xem email đã đăng kí hay chưa
        if (info.email == adminUser.email){
            setError("Email đã được đăng ký.")
        }
        else{
            // Đăng ký thành công.
            // Cập nhật database - backend

            //
            setUser({
                name: info.name,
                email : info.email
            })
            console.log("Đăng ký thành công");
        } 
        
    }


    return (
        <div className="Login">
            {(isLogin == 1) ? (
                <LoginForm updateIsLogin={updateIsLogin} Login={Login} error={error}/>

            ):(
                <RegisterForm updateIsLogin={updateIsLogin} Register={Register} error={error}/>
            )}
        </div>
        
    )
}

export default Login
