// src/pages/JoinRoomPage.js (with invalid roomId check)
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const JoinRoomPage = () => {
  const { roomId } = useParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  if (!roomId) {
    return (
      <div className="text-center p-10 text-red-500 font-bold">
        Invalid Room ID. Go back.
      </div>
    );
  }

  const handleJoin = async () => {
    if (!name.trim()) return;
    localStorage.setItem(`joiner-name-${roomId}`, name);
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#ffe1e8] to-[#fad0c4] p-4">
      <div className="bg-white/60 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <div className="text-3xl font-bold mb-2">Join Chat Room</div>
        <p className="text-md font-semibold mb-6">Room ID: <span className="font-mono font-bold">{roomId}</span></p>
        <input
          type="text"
          className="w-full px-4 py-3 mb-4 rounded-full border text-center text-gray-700"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={handleJoin}
          className="w-full bg-pink-400 hover:bg-pink-500 text-white font-semibold py-3 rounded-full shadow"
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

export default JoinRoomPage;
