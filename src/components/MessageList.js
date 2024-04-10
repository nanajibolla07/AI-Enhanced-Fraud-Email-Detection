import React from 'react'
import MessageCard from './MessageCard'

const MessageList = ({messages}) => {
  return (
    <div>
      {
        messages.map((message, index) => <MessageCard key={index} message={message.content} result={message.result}/> )
      }
    </div>
  )
}

export default MessageList
