// src/pages/ChatPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { db } from '../firebase';

const ChatPage = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    const createdFlag = sessionStorage.getItem(`created-${roomId}`);
    setIsCreator(!!createdFlag);
  }, [roomId]);

  useEffect(() => {
    const messagesRef = ref(db, `rooms/${roomId}/messages`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(Object.values(data));
      }
    });
  }, [roomId]);

  const handleSend = () => {
    if (newMessage.trim() === '') return;
    const messagesRef = ref(db, `rooms/${roomId}/messages`);
    push(messagesRef, {
      text: newMessage,
      sender: isCreator ? 'creator' : 'guest',
      timestamp: Date.now(),
    });
    setNewMessage('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2 style={{ fontSize: '24px' }}>Chat Room: <strong>{roomId}</strong></h2>
      {isCreator && (
        <p style={{ fontSize: '16px', marginBottom: '10px' }}>
          🔗 Share this code with your partner to join this room: <strong>{roomId}</strong>
        </p>
      )}

      <div style={{ margin: '20px 0' }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: msg.sender === 'creator' ? 'flex-end' : 'flex-start',
              marginBottom: '8px'
            }}
          >
            <div
              style={{
                backgroundColor: msg.sender === 'creator' ? '#d4f4dd' : '#e6f0ff',
                padding: '10px 14px',
                borderRadius: '20px',
                maxWidth: '70%',
                fontSize: '16px'
              }}
            >
              {msg.sender === 'creator' ? '💚' : '💙'} {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ padding: '10px', width: '70%', fontSize: '16px', marginRight: '10px' }}
        />
        <button onClick={handleSend} style={{ padding: '10px 20px', fontSize: '16px' }}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
