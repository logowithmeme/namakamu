import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDatabase, ref, onValue, push } from 'firebase/database';
import { db } from '../firebase';

const ChatPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const isCreator = new URLSearchParams(location.search).get('creator') === 'true';

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const messagesRef = ref(db, `rooms/${id}/messages`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(Object.values(data));
      }
    });
  }, [id]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const msgData = {
      text: newMessage,
      sender: isCreator ? 'creator' : 'receiver',
      timestamp: new Date().toISOString(),
    };

    push(ref(db, `rooms/${id}/messages`), msgData);
    setNewMessage('');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Chat Room: {id}</h2>

      <div>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === 'creator' ? 'right' : 'left',
              margin: '0.5rem 0',
            }}
          >
            <span style={{ fontSize: '1.1rem' }}>
              {msg.sender === 'creator' ? '💚' : '💙'} {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ padding: '0.5rem', width: '60%' }}
        />
        <button onClick={handleSend} style={{ padding: '0.5rem' }}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
