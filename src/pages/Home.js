// src/pages/RoomCreated.js (Styled Copy Button Like Image Ref)
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const RoomCreated = () => {
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const generateRoom = async () => {
      const newRoomId = uuidv4().slice(0, 8);
      await setDoc(doc(db, 'rooms', newRoomId), {
        createdAt: new Date().toISOString(),
      });
      setRoomId(newRoomId);
    };
    generateRoom();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
  };

  const startChat = () => {
    if (name.trim() !== '') {
      localStorage.setItem(`creator-${roomId}`, Date.now().toString());
      localStorage.setItem(`creator-name-${roomId}`, name);
      navigate(`/chat/${roomId}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#ffecd2] to-[#fcb69f] p-4">
      <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-extrabold text-black mb-2">Chat Room Created</h1>
        <p className="text-lg font-bold text-black mb-2">
          Room ID: <span className="font-mono text-black">{roomId}</span>
        </p>
        <p className="text-black mb-6">Share this code with your partner to join.</p>

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full px-4 py-3 rounded-xl border border-gray-300 mb-4 text-center focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={handleCopy}
          className="w-full bg-[#ffe0e9] hover:bg-[#ffcad9] text-black font-semibold py-3 rounded-full shadow mb-3 transition"
        >
          Copy Room ID
        </button>

        <button
          onClick={startChat}
          className="w-full bg-[#ffd7c2] hover:bg-[#ffc9a4] text-black font-semibold py-3 rounded-full shadow transition"
        >
          Start Chatting
        </button>
      </div>
    </div>
  );
};

export default RoomCreated;
