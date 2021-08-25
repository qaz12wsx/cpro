import React, { useState } from 'react';
import './App.css';
import './css/all.css';
import firebase from 'firebase';
import Config from './config';
import loginLogo from './img/login.png';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

function Login() {
    const history = useHistory();
    if (!firebase.apps.length) {
        firebase.initializeApp(Config);
      } else {
        firebase.app();
      }

    const [email, setemail] = useState("");
    const [pass, setpass] = useState("");
    
    async function login(){
        firebase.auth()
            .signInWithEmailAndPassword(email, pass)
            .then(result => {
                console.log(result);
                history.push("manage")
            })
            .catch(error => {
                console.log(error.message);
            });
    };

    return (
        <div className="login">
            <div className="banner">
                <h1>後台管理</h1>
            </div>
            <form className="login-form">
                <ul>
                    <li><img src={loginLogo} alt="login"></img></li>
                    <li><p>登入</p></li>
                    <li><TextField
                    id="account"
                    label="帳號"
                    type="text"
                    value ={email}
                    onChange={e=>setemail(e.target.value)}
                    /></li>
                    <li><TextField
                    id="password"
                    label="密碼"
                    type="password"
                    autoComplete="current-password"
                    value ={pass}
                    onChange={e=>setpass(e.target.value)}
                    /></li>
                    <li>
                    <Button variant="contained" color="primary" onClick={login}>
                        登入
                    </Button></li>
                </ul>
            </form>
            <div className="footer">
                <p>Copyright © 2021 Eviane Inc.</p>
            </div>
        </div>
    )
}

export default Login;