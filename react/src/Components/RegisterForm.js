import React, { useState } from 'react';


function RegisterForm({ updateIsLogin, Register, error }) {

    const [info, setInfo] = useState({ email: "", name: "", address: '', phone: "", password: "" })
    const [errForm, setErrForm] = useState("");
    const [errPassword, setErrPassword] = useState("");
    const [errRePassword, setErrRePassword] = useState("");


    const submitHandler = e => {
        e.preventDefault();

        if (info.name === "" || info.email === "" || info.password === ""){
            setErrForm("Vui lòng nhập đầy đủ thông tin.");
        }
        else{
            setErrForm("");
            if (errRePassword === "") Register(info);
        }
        console.log(error);
    }
    
    
    
    const dangNhapNgay = e => {
        updateIsLogin();
    }

    const checkPassword = password => {
        setInfo({ ...info, password: password })
        // Kiểm tra password bao gồm chữ cái và số
        /*
        
        
        
        */
    }

    
    const checkRePassword = rePassword => {
        if (rePassword !== "" && rePassword !== info.password) {
            setErrRePassword("Mật khẩu không khớp!!!");
        } else setErrRePassword("");
    }

    return (
        <div className="formView">
            <form onSubmit={submitHandler}>
                <div className="form-inner">
                    <h2>Đăng ký</h2>
                    {(error !== "") ? (<div className="error">{error}</div>) : ""}
                    {(errForm !== "") ? (<div className="error">{errForm}</div>) : ""}
                    <div className="form-group">
                        <label htmlFor="name"> Họ và Tên: </label>
                        <input type="text" name="name" id="name" onChange={e => setInfo({ ...info, name: e.target.value })} value={info.name} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email"> Email: </label>
                        <input type="email" name="email" id="email" onChange={e => setInfo({ ...info, email: e.target.value })} value={info.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password"> Mật khẩu: </label>
                        <input type="password" name="password" id="password" onChange={e => checkPassword(e.target.value)} value={info.password} />
                    </div>

                    {(errPassword !== "") ? (<div className="errPassword">{errPassword}</div>) : ""}

                    <div className="form-group">
                        <label htmlFor="password"> Xác nhận mật khẩu: </label>
                        <input type="password" name="password" onChange={e => checkRePassword(e.target.value)} />
                    </div>

                    {(errRePassword !== "") ? (<div className="errPassword">{errRePassword}</div>) : ""}

                    <input type="submit" value="Đăng ký" />
                    <div className="dangkyngay">Bạn đã có tài khoản?
                        <span className="end_" ><input type="submit" value="Đăng nhập ngay." onClick={dangNhapNgay} />
                        </span></div>                    
                </div>
            </form>
        </div>

    )
}

export default RegisterForm;
