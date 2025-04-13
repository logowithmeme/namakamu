// 💖 Namakamu ChatPage.js with Mood Toggle 💚💙 + 😇/😡
import React, { useEffect, useState, useRef } from 'react';
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
  const [creatorId, setCreatorId] = useState('');
  const [userName, setUserName] = useState(localStorage.getItem('username') || '');
  const [mood, setMood] = useState(localStorage.getItem('mood') || '😇');
  const chatEndRef = useRef(null);

  useEffect(() => {
    const creator = localStorage.getItem(`creator-${roomId}`);
    if (!creator) {
      localStorage.setItem(`creator-${roomId}`, Date.now().toString());
      setCreatorId(localStorage.getItem(`creator-${roomId}`));
    } else {
      setCreatorId(creator);
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
    if (message.trim() === '') return;
    await addDoc(collection(db, 'rooms', roomId, 'messages'), {
      text: message,
      sender: creatorId,
      name: userName,
      mood,
      timestamp: serverTimestamp(),
    });
    setMessage('');
  };

  const toggleMood = () => {
    const newMood = mood === '😇' ? '😡' : '😇';
    setMood(newMood);
    localStorage.setItem('mood', newMood);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100 py-6 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        <div className="bg-pink-200 text-center py-4 text-2xl font-semibold text-pink-900">
          💗 Namakamu Chat Room
        </div>

        <div className="px-4 pt-4 flex justify-between items-center">
          <input
            type="text"
            className="px-3 py-1 rounded-full border border-gray-300 text-sm"
            placeholder="Enter your name"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              localStorage.setItem('username', e.target.value);
            }}
          />

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Mood:</span>
            <button
              onClick={toggleMood}
              className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                mood === '😇' ? 'bg-green-400' : 'bg-red-400'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ${
                  mood === '😇' ? 'translate-x-0' : 'translate-x-4'
                }`}
              ></div>
            </button>
            <span className="text-lg">{mood}</span>
          </div>
        </div>

        <div className="px-4 py-4 h-[60vh] overflow-y-auto space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === creatorId ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[75%] text-white text-sm shadow-md whitespace-pre-wrap break-words ${
                  msg.sender === creatorId ? 'bg-green-400 rounded-br-none' : 'bg-blue-400 rounded-bl-none'
                }`}
              >
                <span className="font-semibold">
                  {msg.sender === creatorId ? '💚' : '💙'} {msg.name || 'Anonymous'} {msg.mood || '😇'}:
                </span>
                <br />
                {msg.text}
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
            className="bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded-full transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;