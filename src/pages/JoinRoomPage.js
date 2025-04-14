// Updated ChatPage.js with final fixes
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
  getDocs,
  doc,
  setDoc
} from 'firebase/firestore';

const ChatPage = () => {
  const { roomId } = useParams();
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const checkRoom = async () => {
      const roomRef = doc(db, 'chatrooms', roomId);
      const roomSnap = await getDocs(collection(db, 'chatrooms'));
      const exists = roomSnap.docs.some(doc => doc.id === roomId);

      if (!exists) {
        alert('Room Not Found!');
        return;
      }

      const q = query(collection(db, 'chatrooms', roomId, 'messages'), orderBy('timestamp'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map(doc => doc.data()));
      });

      setHasJoined(true);
      return () => unsubscribe();
    };

    checkRoom();
  }, [roomId]);

  const handleSend = async () => {
    if (input.trim() === '' || name.trim() === '') return;
    await addDoc(collection(db, 'chatrooms', roomId, 'messages'), {
      name,
      text: input,
      timestamp: serverTimestamp(),
    });
    setInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!hasJoined) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50">
        <h2 className="text-2xl font-bold">Joining Room...</h2>
      </div>
    );
  }

  if (!name) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Enter Your Name to Join</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="px-4 py-2 border rounded-md focus:outline-none"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 p-4 flex flex-col">
      <div className="text-center text-lg font-semibold text-purple-800 mb-2">Room ID: {roomId}</div>
      <div className="flex-1 overflow-y-auto space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.name === name ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-lg shadow-md max-w-xs text-white whitespace-pre-wrap break-words ${
                msg.name === name ? 'bg-green-500' : 'bg-blue-500'
              }`}
            >
              <span className="font-bold mr-1">{msg.name}:</span> {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
