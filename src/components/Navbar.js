import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import {AuthContext} from '../contexts/authContext';


const Navbar = () => {
  const { isLoggedIn,validateLogin,logout } = useContext(AuthContext);
  validateLogin();

  return (
    <div className='flex-between'>
        <div className='nav-list nav-links'>
            <h5 className='heading'>Fraud Email Detection</h5>  
            <Link className="td-none" to={'/home'}><div>Home</div></Link>
            <Link className="td-none" to={'/'}><div>About</div></Link>
            <Link className="td-none" to={'/'}><div>Portfolio</div></Link>
        </div>
        {!isLoggedIn &&
        <div className='nav-list'>
            <Link className="td-none" to={'/login'}><div className='login'>Sign In</div></Link>
            <Link className="td-none" to={'/signup'}><div className='signup'>Sign Up</div></Link>
        </div>}
        {isLoggedIn &&
        <div className='nav-list'>
          <div className='logout' onClick={logout}>Log Out</div>  
        </div>}
    </div>
  )
}

export default Navbar

