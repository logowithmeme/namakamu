// src/pages/ChatPage.js
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';

const ChatPage = () => {
  const { roomId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderId] = useState('');
  const [username, setUsername] = useState('');
  const [angerMode, setAngerMode] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const creatorName = localStorage.getItem(`creator-name-${roomId}`);
    const joinerName = localStorage.getItem(`joiner-name-${roomId}`);

    if (creatorName) {
      setSenderId('creator');
      setUsername(creatorName);
    } else if (joinerName) {
      setSenderId('joiner');
      setUsername(joinerName);
    }

    const q = query(collection(db, 'rooms', roomId, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, [roomId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim() || !senderId || !username) return;

    try {
      await addDoc(collection(db, 'rooms', roomId, 'messages'), {
        text: message,
        timestamp: serverTimestamp(),
        sender: senderId,
        name: username,
      });
      setMessage('');
    } catch (err) {
      console.error('Send error:', err);
    }
  };

  return (
    <div className={`min-h-screen px-4 py-10 transition-all duration-500 ${angerMode
      ? 'bg-gradient-to-br from-red-500 via-red-700 to-red-900'
      : 'bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100'}`}>

      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between bg-pink-200 px-6 py-4">
          <h2 className="text-2xl font-semibold text-pink-900">
            Chat Room: {roomId}
          </h2>

          {/* Anger Mode Toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm font-semibold text-pink-900">Anger</span>
            <input type="checkbox" className="sr-only" onChange={() => setAngerMode(!angerMode)} />
            <div className={`w-10 h-5 rounded-full ${angerMode ? 'bg-red-600' : 'bg-gray-300'} relative transition`}>
              <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${angerMode ? 'left-5 -translate-x-full' : 'left-0.5'}`} />
            </div>
          </label>
        </div>

        <div className="px-4 py-6 h-[60vh] overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === senderId ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[70%] text-black text-base shadow-md
                whitespace-pre-wrap break-words ${msg.sender === senderId
                    ? 'bg-green-100 rounded-br-none'
                    : 'bg-blue-100 rounded-bl-none'
                  }`}
              >
                <span className="font-semibold">{msg.name}:</span> {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 border-t flex items-center gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-pink-400 hover:bg-pink-500 text-white font-semibold px-6 py-2 rounded-full shadow-md transition text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
