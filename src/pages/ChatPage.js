// src/pages/ChatPage.js
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { ref, onChildAdded, push, set, get } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

const Countdown = ({ createdAt }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const end = new Date(createdAt);
      end.setHours(end.getHours() + 24);
      const now = new Date();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft("⏳ Room expired");
        clearInterval(interval);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(`⏳ ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt]);

  return <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>{timeLeft}</div>;
};

const ChatPage = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId] = useState(() => localStorage.getItem('userId') || uuidv4());
  const [roomExists, setRoomExists] = useState(true);
  const [roomCreatedAt, setRoomCreatedAt] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('userId', userId);

    const roomRef = ref(db, `rooms/${roomId}`);
    get(roomRef).then(snapshot => {
      if (!snapshot.exists()) {
        setRoomExists(false);
        return;
      }
      const data = snapshot.val();
      if (data.createdAt) {
        setRoomCreatedAt(data.createdAt);
      }

      const messagesRef = ref(db, `rooms/${roomId}/messages`);
      onChildAdded(messagesRef, (snapshot) => {
        const message = snapshot.val();
        setMessages(prev => [...prev, message]);
      });
    });
  }, [roomId, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const messagesRef = ref(db, `rooms/${roomId}/messages`);
    await push(messagesRef, {
      text: newMessage,
      sender: userId,
      timestamp: new Date().toISOString(),
    });
    setNewMessage('');
  };

  if (!roomExists) {
    return <h2>❌ Room Not Found</h2>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to Room: {roomId}</h1>
      {roomCreatedAt && <Countdown createdAt={roomCreatedAt} />}
      <div style={{ maxHeight: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === userId ? 'right' : 'left',
              margin: '10px 0',
              backgroundColor: msg.sender === userId ? '#dcf8c6' : '#f1f0f0',
              borderRadius: '10px',
              padding: '10px',
              display: 'inline-block',
              maxWidth: '70%'
            }}
          >
            {msg.text} {msg.sender === userId ? '💚' : '💙'}
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <form onSubmit={sendMessage} style={{ marginTop: '20px' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ width: '80%', padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px' }}>Send</button>
      </form>
    </div>
  );
};

export default ChatPage;
