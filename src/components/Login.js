import React, { useState, useContext, useEffect } from 'react';
import { Eye,EyeSlash,WarningDiamond } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {AuthContext} from '../contexts/authContext';

export default function Login() {
    const { isLoggedIn, login } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(()=>{
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if(isLoggedIn){
            navigate("/home")
        }
    })
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }
    const [passwordView,setPasswordView] = useState("password");
    const  togglePasswordVisibility = () =>{
        setPasswordView(prevType => prevType === "password" ? "text" : "password");
    }

    const validateInput = () =>{
        let isValid = validatePassword();
        return validateEmail() && isValid;
    }

    const [isEmailValid,setIsEmailValid] = useState(true);
    const [emailErrorMsg,setEmailErrorMsg] = useState("");
    const validateEmail = () =>{
        let email = document.querySelector("#email").value;
        email = email.trim();
        if(email === ""){
            setEmailErrorMsg("  Email is required");
            setIsEmailValid(false);
            return false;
        }
        let regex = /^[a-zA-Z]+[0-9]*@gmail.com$/;
        if(!regex.test(email)){
            setEmailErrorMsg("  Enter valid email");
            setIsEmailValid(false);
            return false;
        }
        setIsEmailValid(true);
        return true;
    }

    const [isPasswordValid,setIsPasswordValid] = useState(true);
    const [passwordErrorMsg,setPasswordErrorMsg] = useState("");
    const validatePassword = () =>{
        let password = document.querySelector("#password").value;
        password = password.trim();
        if(password === ""){
            setPasswordErrorMsg("  password is required");
            setIsPasswordValid(false);
            return false;
        }
        if(password.length < 8){
            setPasswordErrorMsg("  Atleast 8 characters");
            setIsPasswordValid(false);
            return false;
        }
        setIsPasswordValid(true);
        return true;
    }

    const [isResultSuccess,setisResultSuccess] = useState(true);
    const [backendErrorMsg,setBackendErrorMsg] = useState("");
    const formSubmit = async(e) =>{
        e.preventDefault();
        if(!validateInput()){
            return; 
        }
        const response = await fetch("http://localhost:5000/api/auth/login",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email,password: credentials.password})
        });
        const json = await response.json();
        if(json.success){
            login(json.authtoken);
            setCredentials({ email: "", password: "" });
            setisResultSuccess(true);
        }
        else{
            setisResultSuccess(false);
            setBackendErrorMsg("  "+json.message);
        }
    }

    return (
        <div className="place-center height-full-page">
            <form className="userForm" onSubmit={formSubmit} noValidate>
                <h2>Login</h2>
                <div className="input-container">
                    <input type="email" name="email" id="email" placeholder="Email" onChange={onChange} required></input>
                    <p className='error'>{!isEmailValid && <><WarningDiamond size={14}/><span>{emailErrorMsg}</span></>}</p>
                </div>
                <div className="input-container">
                    <input type={passwordView} name="password" id="password" placeholder="Password" onChange={onChange} minLength={8} required></input>
                    <span className="password-show" onClick={togglePasswordVisibility}>{passwordView==="password" ? <EyeSlash size={16}/> : <Eye size={16}/>}</span>
                    <p className='error'>{!isPasswordValid && <><WarningDiamond size={14}/><span>{passwordErrorMsg}</span></>}</p>
                </div>
                <div>
                    <p className='error'>{!isResultSuccess && <><WarningDiamond size={14}/><span>{backendErrorMsg}</span></>}</p>
                    <button className="button orange">Login</button>
                </div>
                <div className="line"></div>
                <Link to={'/signup'}><button className="button grey">Signup</button></Link>
            </form>
        </div>
    )
}