import React from 'react'
import { Link } from "react-router-dom";

const Navbar1 = () => {
  return (
    <div className='flex-between'>
        <div className='nav-list nav-links'>
            <h5 className='heading'>Fraud Email Detection</h5>  
            <Link className="td-none" to={'/home'}><div>Home</div></Link>
            <Link className="td-none" to={'/'}><div>About</div></Link>
            <Link className="td-none" to={'/'}><div>Portfolio</div></Link>
        </div>
        <div className='nav-list'>
            <Link className="td-none" to={'/login'}><div className='login'>Sign In</div></Link>
            <Link className="td-none" to={'/signup'}><div className='signup'>Sign Up</div></Link>
        </div>
    </div>
  )
}

export default Navbar1

