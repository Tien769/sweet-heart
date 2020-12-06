import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm({ updateIsLogin, Login, error }) {

    const [details, setDetails] = useState({email: "", password: "" })

    const submitHandler = e => {
        e.preventDefault();
        Login(details);
    }
    const dangKyNgay = e => {
        updateIsLogin();
    }
    return (
        <div className="formView">
            <form onSubmit={submitHandler} 
            >
                <div className="form-inner" >
                    <h2  >Đăng nhập</h2>
                    {(error != "") ? (<div className="error">{error}</div>) : ""}
                    <div className="form-group">
                        <label htmlFor="email"> Email: </label>
                        <input type="email" name="email" id="email" onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password"> Mật khẩu: </label>
                        <input type="password" name="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                        <div className="quenmatkhau">Quên mật khẩu?</div>
                    </div>

                    
                    <input type="submit" value="Đăng nhập" />
                    <div className="dangkyngay">Chưa có tài khoản? 
                        <span className="end_" ><input type="submit" value="Đăng kí ngay." onClick={dangKyNgay}/>
                        </span></div>
                </div>
            </form>
        </div>

    )
}

export default LoginForm;
