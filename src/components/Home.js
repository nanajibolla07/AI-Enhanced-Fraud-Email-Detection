import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className='home-container page-bg'>
        <div>
            <div className='home-heading'>Click here to check wheather you Email is Geninune or Fraud</div>
            <Link to={'/'}><button className='btn-runanalysis'>Run Analysis</button></Link>
        </div>
        <div>
            <img src={'aiMessage.png'}></img>
        </div>
    </div>
  )
}

export default Home
