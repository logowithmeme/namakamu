// src/pages/ChatPage.js
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, push, onChildAdded } from 'firebase/database';
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

const ChatPage = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  const [userId] = useState(() => {
    const stored = sessionStorage.getItem('namakamuUserId');
    if (stored) return stored;
    const newId = uuidv4();
    sessionStorage.setItem('namakamuUserId', newId);
    return newId;
  });

  useEffect(() => {
    const messagesRef = ref(db, `rooms/${roomId}/messages`);
    onChildAdded(messagesRef, (snapshot) => {
      setMessages((prev) => [...prev, snapshot.val()]);
    });
  }, [roomId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messagesRef = ref(db, `rooms/${roomId}/messages`);
    await push(messagesRef, {
      id: uuidv4(),
      text: newMessage,
      senderId: userId,
      timestamp: Date.now(),
    });
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-center">Chat Room: {roomId}</h1>
      <div className="flex-1 overflow-y-auto bg-white rounded-xl shadow p-4 mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 flex ${msg.senderId === userId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-xl px-4 py-2 max-w-xs break-words text-white text-sm shadow-lg
                ${msg.senderId === userId ? 'bg-green-500' : 'bg-blue-500'}`}
            >
              <span className="inline-block mr-1">
                {msg.senderId === userId ? '💚' : '💙'}
              </span>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSend} className="flex items-center">
        <input
          className="flex-1 rounded-l-xl px-4 py-2 border border-gray-300 focus:outline-none focus:ring"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded-r-xl hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
