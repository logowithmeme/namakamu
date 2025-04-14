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
    if (!joinCode.trim()) return alert('Please enter a Room ID');
    const ref = doc(db, 'rooms', joinCode);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      navigate(`/join-room/${joinCode}`);
    } else {
      alert('Invalid Room ID');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#ffd9de] to-[#ffe5d9] px-4 py-10">
      <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <div className="text-4xl font-bold text-black mb-1">Namakamu</div>
        <p className="text-md text-black mb-6 font-medium">A secret space for two hearts.</p>

        <button
          onClick={handleCreateRoom}
          className="w-full bg-[#f17380] hover:bg-[#e76271] text-white font-semibold py-3 rounded-full shadow mb-4 transition"
        >
          Create Room
        </button>

        <div className="bg-white/80 p-4 rounded-xl shadow-inner mb-4">
          <input
            className="w-full px-4 py-3 rounded-full border border-gray-300 text-center mb-3 focus:outline-none"
            placeholder="Enter Room ID"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
          />
          <button
            onClick={handleJoinRoom}
            className="w-full bg-[#f58b6c] hover:bg-[#ec7a5a] text-white font-semibold py-3 rounded-full shadow"
          >
            Join Room
          </button>
        </div>

        <button className="w-full border border-yellow-500 text-black font-semibold py-2 rounded-full shadow flex items-center justify-center gap-2">
          <span role="img" aria-label="lock">🔒</span> Shared memories
        </button>
      </div>
    </div>
  );
};

export default Home;