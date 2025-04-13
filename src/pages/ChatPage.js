// src/pages/ChatPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

const ChatPage = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [creatorId, setCreatorId] = useState('');

  useEffect(() => {
    const storedId = localStorage.getItem(`creator-${roomId}`);
    if (!storedId) {
      const id = Date.now().toString();
      localStorage.setItem(`creator-${roomId}`, id);
      setCreatorId(id);
    } else {
      setCreatorId(storedId);
    }

    const q = query(
      collection(db, 'rooms', roomId, 'messages'),
      orderBy('timestamp')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });
    return () => unsubscribe();
  }, [roomId]);

  const handleSend = async () => {
    if (!message.trim()) return;
    await addDoc(collection(db, 'rooms', roomId, 'messages'), {
      text: message,
      timestamp: serverTimestamp(),
      sender: creatorId,
    });
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-pink-200 p-4 text-center text-xl font-semibold text-pink-800">
          💗 Namakamu Chat Room
        </div>
        <div className="h-[65vh] overflow-y-auto px-4 py-2 space-y-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === creatorId ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-xl text-white text-sm whitespace-pre-wrap break-words shadow-md
                ${msg.sender === creatorId ? 'bg-green-400 rounded-br-none' : 'bg-blue-400 rounded-bl-none'}`}
              >
                <span className="inline-block mr-1">
                  {msg.sender === creatorId ? '💚' : '💙'}
                </span>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 border-t p-4">
          <input
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
