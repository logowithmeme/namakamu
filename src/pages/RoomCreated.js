// src/pages/RoomCreated.js (Final working version)
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const RoomCreated = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isFromHome = location.state?.fromHome;
    if (!isFromHome) {
      navigate('/');
      return;
    }

    const newRoomId = uuidv4().slice(0, 8);
    setDoc(doc(db, 'rooms', newRoomId), { createdAt: Date.now() })
      .then(() => {
        localStorage.setItem(`creator-${newRoomId}`, Date.now().toString());
        setRoomId(newRoomId);
        setLoading(false);
      })
      .catch(() => navigate('/'));
  }, [navigate, location]);

  const handleStart = () => {
    if (!name.trim()) return;
    localStorage.setItem(`creator-name-${roomId}`, name);
    navigate(`/chat/${roomId}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
  };

  if (loading) return <div className="text-center p-10 text-pink-600 font-bold">Creating room...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#ffdcdc] to-[#ffe8cc] p-4">
      <div className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-black mb-2">Chat Room Created</h2>
        <p className="text-md font-semibold mb-1">Room ID: <span className="font-mono font-bold">{roomId}</span></p>
        <button
          onClick={handleCopy}
          className="bg-pink-300 hover:bg-pink-400 px-4 py-1 rounded-full text-sm font-medium text-black mb-4 shadow"
        >
          Copy Room ID
        </button>
        <p className="text-sm text-black mb-6">Share this code with your partner to join.</p>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-full border border-gray-300 text-center mb-4"
        />

        <button
          onClick={handleStart}
          className="w-full bg-pink-400 hover:bg-pink-500 text-white font-semibold py-3 rounded-full shadow"
        >
          Start Chatting
        </button>
      </div>
    </div>
  );
};

export default RoomCreated;
