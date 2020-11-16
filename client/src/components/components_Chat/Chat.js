import React, { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import PropTypes from 'prop-types';
import io from 'socket.io-client'

const Chat = () => {
  const [yourId, setYourId] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);
  const socketRef = useRef()

  useEffect(() => {
    socketRef.current = io.connect('/');

    socketRef.current.on('your id', id => {
      setYourId(id);
    });

    socketRef.current.on('message', (message) => {
      receivedMessage(message)
    })
  })

  function receivedMessage(message) {
    setMessages(oldMsgs => [...oldMsgs, message]);
  }

  function sendMessage(event) {
    event.preventDefault();
    const messageObject = {
      body: message,
      id: yourId,
    };
    setMessage("");
    socketRef.current.emit('send message', messageObject);
  }

  function handleChange(event) {
    setMessage(event.target.value)
  }



  return (
    <>
      <div className='chat-box'>
        <div className='msg-page'>
          
          <div className='chat-box-bottom'>
          
          <div id='end-of-chat'></div>
        </div>
        </div>
        <div className='msg-footer'>
          <form
            className='message-form'>

            <div className='input-group'>
              <input
                type="text"
                name="username"
                placeholder="Enter Text"
          

              />
            </div>
          </form>
        </div>
      </div>
    </>
  )

};

export default Chat;