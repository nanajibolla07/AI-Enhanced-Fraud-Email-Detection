import React from 'react'

const MessageCard = (props) => {
  return (
    <div className='message-card'>
      <div className='message'>{props.message}</div>
      <div className='result'>{props.result === 0 ? "Genuine" : "Fraud"}</div>
    </div>
  )
}

export default MessageCard
