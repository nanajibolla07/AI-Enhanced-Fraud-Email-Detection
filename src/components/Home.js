import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import {AuthContext} from '../contexts/authContext';
import MessageList from './MessageList';

const Home = () => {
  const [toDisplayMessages, setToDisplayMessages] = useState(false);
  const [messages, setMessages] = useState({});
  
  const { isLoggedIn } = useContext(AuthContext);
  const viewSavedMessages = async() => {
    const authtoken = localStorage.getItem("authtoken");
    if(!authtoken) {
      return;
    }
    const response = await fetch("http://localhost:5000/api/message/fetchallmessages",
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': authtoken
        },
    });
    const result = await response.json();
    if(result.success){
      setMessages(result.messages);
      setToDisplayMessages(true);
    }
  }
  const hideMessages = () =>{
    setToDisplayMessages(false);
    setMessages({});
  }

  return (
    <>
      <div className='home-container height-full-page'>
          <div className='banner-heading'>
              <div className='home-heading-text'>Click here to check wheather you Email is Geninune or Fraud</div>
              <div>
                <Link to={'/'}><button className='btn-size mr-1'>Run Analysis</button></Link>
                {isLoggedIn && !toDisplayMessages && <button className="btn-size" onClick={viewSavedMessages}>View Saved Messages</button>}
                {toDisplayMessages && <button className="btn-size" onClick={hideMessages}>Hide Messages</button>}
              </div>
          </div>
          <div>
              <img src={'aiMessage.png'} alt='Banner'></img>
          </div>
      </div>
      { toDisplayMessages && isLoggedIn && <MessageList messages={messages}/> }
    </>
  )
}

export default Home
