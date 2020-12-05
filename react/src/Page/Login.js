import React, {useState} from 'react';
import LoginForm from '../Components/LoginForm';
import style from './Login.module.css';
function Login() {
    const adminUser = {
        name: "Nhut",
        email: "hoangnhutsp@gmail.com",
        password: "111"
    }
    const [user, setUser] = useState({name: "", email: ""});
    const [error, setError] = useState("");

    const Login = details => {
        console.log(details);

        if (details.email == adminUser.email && details.password == adminUser.password){
            console.log("Logged in");
            setUser({
                name : adminUser.name,
                email : details.email
            })
        } else {
            console.log("Details do not match!");
            setError("Sai tai khoan hoac mat khau!!!")
        }
    }
    const Logout = () => {
        console.log("Logout");
        setUser({name:"", email:""});
    }
    return (

        <div className="Login">
           {(user.email != "") ? (
               <div className="welcome">
                   <h2>Welcome, <span>{user.name}</span></h2>
                   <button onClick={Logout}>Logout</button>
                </div>
           ):(
                <LoginForm Login={Login} error={error}/>
           )}
        </div>
        
    )
}

export default Login
