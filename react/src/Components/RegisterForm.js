import React, { useState } from 'react';


function RegisterForm({ updateIsLogin, Register, error }) {

    const [info, setInfo] = useState({email: "", name: "", address: '', phone:"", password: ""})

    const submitHandler = e => {
        e.preventDefault();
        Register(info);
    }
    const dangNhapNgay = e => {
        updateIsLogin();
    }
    return (
        <div className="formView">
            <form onSubmit={submitHandler}>
                <div className="form-inner">
                    <h2>Đăng ký</h2>
                    {(error != "") ? (<div className="error">{error}</div>) : ""}
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
                        <input type="password" name="password" id="password" onChange={e => setInfo({ ...info, password: e.target.value })} value={info.password} />
                    </div>  

                    <input type="submit" value="Dang ki" />
                    <div className="dangkyngay">Bạn đã có tài khoản? 
                        <span className="end_" ><input type="submit" value="Đăng nhập ngay." onClick={dangNhapNgay}/>
                        </span></div>
                </div>
            </form>
        </div>

    )
}

export default RegisterForm;
