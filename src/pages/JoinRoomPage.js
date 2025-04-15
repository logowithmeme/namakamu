// src/pages/JoinRoomPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const JoinRoomPage = () => {
  const { roomId } = useParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleJoin = async () => {
    if (!name.trim()) return;
    localStorage.setItem(`joiner-name-${roomId}`, name);
    navigate(`/chat/${roomId}`);
  };

  if (!roomId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100">
        <div className="text-red-600 font-semibold text-lg">Invalid Room ID. Go back.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#ffecd2] to-[#fcb69f] p-4">
      <div className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <div className="text-3xl font-bold text-[#3f1d1d] mb-2">Join Chat Room</div>
        <p className="text-md text-[#3f1d1d] font-semibold mb-6">
          Room ID: <span className="font-mono font-bold">{roomId}</span>
        </p>

        <input
          type="text"
          className="w-full px-4 py-3 mb-4 rounded-full border border-gray-300 text-center text-gray-700 focus:outline-none"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={handleJoin}
          className="w-full bg-[#f97373] hover:bg-[#ef4444] text-white font-semibold py-3 rounded-full shadow transition"
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

export default JoinRoomPage;
