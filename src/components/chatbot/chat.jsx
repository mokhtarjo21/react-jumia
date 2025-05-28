import React, { useState, useRef, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { instance } from '../../axiosInstance/instance';
const ChatWidget = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef(null);

  const toggleChat = () => setShowChat(prev => !prev);

  const getCookie = (name) => {
    const cookieStr = document.cookie;
    if (!cookieStr) return null;

    const cookies = cookieStr.split('; ');
    for (let cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) return decodeURIComponent(value);
    }
    return null;
  };

  const appendMessage = (message, isUser) => {
    setMessages(prev => [...prev, { text: message, isUser }]);
  };

  const sendMessage = async () => {
    const message = input.trim();
    if (!message) return;

    appendMessage(message, true);
    setInput('');

   

    try {
         const access = localStorage.getItem('access');
            const response = await instance.post('/api/chat/',{message}, {
              headers: {
                'Authorization': `Bearer ${access}`,
              }
            });
      

      const data = await response.data;

      if (data.error) {
        appendMessage(`Error: ${data.error}`, false);
      } else {
        appendMessage(data.response, false);
      }

    } catch (error) {
      appendMessage(`Error: ${error.message}`, false);
       console.error("Error saving product:");
          if (error.response) {
           
            console.log("Status:", error.response.status);
            console.log("Data:", error.response.data); 
          } else {
             toast.error(error.message)
            console.log(error.message);
          }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      <button className="btn btn-primary rounded-circle" style={{ width: '60px', height: '60px' }} onClick={toggleChat}>
          <i className="fas fa-robot"></i>
      </button>

      {showChat && (
        <div className="card shadow" style={{ position: 'absolute', bottom: '70px', right: 0, width: '300px' }}>
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Chat</h5>
          </div>
          <div className="card-body">
            <p>Welcome! How can we help you?</p>
            <div ref={chatContainerRef} className="overflow-auto mb-2" style={{ maxHeight: '200px' }}>
              {messages.map((msg, i) => (
                <div key={i} className={`text-${msg.isUser ? 'end' : 'start'}`}>
                  <p className={`alert ${msg.isUser ? 'alert-primary' : 'alert-secondary'} d-inline-block`}>
                    {msg.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button className="btn btn-primary" onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
