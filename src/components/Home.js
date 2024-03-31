import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className='home-container height-full-page'>
        <div className='banner-heading'>
            <div className='home-heading-text'>Click here to check wheather you Email is Geninune or Fraud</div>
            <Link to={'/'}><button className='btn-runanalysis btn-size'>Run Analysis</button></Link>
        </div>
        <div>
            <img src={'aiMessage.png'}></img>
        </div>
    </div>
  )
}

export default Home
