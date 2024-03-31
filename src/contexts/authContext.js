import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    const login = (authtoken) => {
      localStorage.setItem("authtoken",authtoken);
      setIsLoggedIn(true);
    };
  
    const logout = () => {
      localStorage.removeItem("authtoken");
      setIsLoggedIn(false);
    };

    const validateLogin = async() => {
      const authtoken = localStorage.getItem("authtoken");
      if(!authtoken) {
        setIsLoggedIn(false);
        return;
      }
      const response = await fetch("http://localhost:5000/api/auth/getuser",
      {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'auth-token': authtoken
          },
      });
      const result = await response.json();
      if(result.success){
        setIsLoggedIn(true);
      }
      else{
        setIsLoggedIn(false);
      }
    }

    return (
      <AuthContext.Provider value={{isLoggedIn, login, logout, validateLogin}}>
        {props.children}
      </AuthContext.Provider>
    )
  }

  export default AuthProvider;
  export {AuthContext};