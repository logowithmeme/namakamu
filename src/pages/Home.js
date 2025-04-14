// src/pages/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Home = () => {
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = useState('');

  const handleCreateRoom = () => {
    navigate('/room-created');
  };

  const handleJoinRoom = async () => {
    if (!joinCode.trim()) return;
    const ref = doc(db, 'rooms', joinCode);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      navigate(`/join-room/${joinCode}`);
    } else {
      alert('Room not found');
    }
  };

  return (
    <div className="min-h-screen bg-sunset-gradient flex flex-col items-center justify-center p-6">
      <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <div className="text-4xl font-bold text-textAccent mb-2">Namakamu</div>
        <p className="text-md text-textAccent mb-6">A secret space for two hearts.</p>

        <button
          onClick={handleCreateRoom}
          className="w-full bg-btn hover:bg-btnHover text-white font-semibold py-3 rounded-full shadow mb-4 transition"
        >
          Create Room
        </button>

        <div className="bg-white p-4 rounded-xl shadow-inner">
          <input
            className="w-full px-4 py-3 rounded-full border border-gray-300 text-center mb-3 focus:outline-none"
            placeholder="Enter Room ID"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
          />
          <button
            onClick={handleJoinRoom}
            className="w-full bg-btn hover:bg-btnHover text-white font-semibold py-3 rounded-full shadow transition"
          >
            Join Room
          </button>
        </div>

        <button className="w-full border mt-6 border-yellow-500 text-textAccent font-semibold py-2 rounded-full shadow flex items-center justify-center gap-2">
          <span role="img" aria-label="lock">🔒</span> Shared memories
        </button>
      </div>
    </div>
  );
};

export default Home;
