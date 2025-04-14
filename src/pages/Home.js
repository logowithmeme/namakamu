// src/pages/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [joinCode, setJoinCode] = useState('');

  const createRoom = async () => {
    const newId = Math.random().toString(36).substring(2, 10);
    await setDoc(doc(db, 'rooms', newId), { createdAt: Date.now() });
    localStorage.setItem(`creator-${newId}`, Date.now().toString());
    navigate(`/room-created/${newId}`);
  };

  const joinRoom = () => {
    if (joinCode.trim()) {
      navigate(`/join-room/${joinCode.trim()}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #FFE1D3, #FEECEB)' }}>
      <div className="text-center max-w-md w-full">
        <div className="text-4xl font-bold text-[#3A2F2F] mb-2">❤️</div>
        <h1 className="text-4xl font-extrabold text-[#3A2F2F]">Namakamu</h1>
        <p className="text-lg text-[#3A2F2F] mt-1 mb-6">A secret space for two hearts.</p>

        <button
          onClick={createRoom}
          className="bg-[#E4685D] hover:bg-[#E1504A] text-white text-lg font-semibold py-3 px-6 rounded-full w-full mb-4 shadow-md transition"
        >
          Create Room
        </button>

        {/* ❌ Removed the duplicate Join Room button here */}

        <div className="bg-[#FFF7F0] rounded-2xl p-6 mt-4 shadow-inner">
          <input
            placeholder="Enter Room ID"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            className="w-full text-center text-lg rounded-xl border border-gray-300 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#E4685D]"
          />
          <button
            onClick={joinRoom}
            className="bg-[#E4685D] hover:bg-[#E1504A] text-white font-semibold py-3 px-6 rounded-full w-full shadow transition"
          >
            Join Room
          </button>
        </div>

        <button
          className="mt-6 bg-white text-[#3A2F2F] font-semibold py-3 px-6 rounded-xl w-full shadow border border-yellow-400 flex items-center justify-center gap-2"
        >
          <span role="img" aria-label="lock">🔒</span> Shared memories
        </button>
      </div>
    </div>
  );
};

export default Home;
