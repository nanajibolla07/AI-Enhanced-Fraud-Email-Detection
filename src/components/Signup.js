import { useState } from "react";
import { Eye,EyeSlash } from "@phosphor-icons/react";
import { Link } from "react-router-dom";


export default function SignUp() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }
    const [passwordView,setPasswordView] = useState("hide");
    const  passwordShow = () =>{
        if(passwordView==="hide"){
            setPasswordView("show")
            document.getElementById("password").type = "text";
        }
        else{
            setPasswordView("hide")
            document.getElementById("password").type = "password";
        }
        console.log(passwordView,document.getElementById("password").type);
    }
    const formSubmit = async(e) =>{
        e.preventDefault();
        console.log(credentials);
        const response = await fetch("http://localhost:5000/api/auth/createuser",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email,password: credentials.password})
        });
        console.log(response);
        const json = await response.json();
        console.log(json);
    }
    return (
        <div className="place-center page-bg">
            <form className="userForm" onSubmit={formSubmit}>
                <h2>Sign Up</h2>
                <div className="input-container">
                    <input type="email" name="email" id="email" placeholder="Email" onChange={onChange} required></input>
                </div>
                <div className="input-container">
                    <input type="password" name="password" id="password" placeholder="Password" onChange={onChange} minLength={8} required></input>
                    <span className="password-show" onClick={passwordShow}>{passwordView==="hide" ? <EyeSlash size={16}/> : <Eye size={16}/>}</span>
                </div>
                <div>
                    <button className="button orange">SignUp</button>
                </div>
                <div className="line"></div>
                <Link to={'/login'}><button className="button grey">Login</button></Link>
            </form>
        </div>
    )
}