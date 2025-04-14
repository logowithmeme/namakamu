// src/pages/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const Home = () => {
  const navigate = useNavigate();
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
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(to bottom right, #FFE7D0, #FEE5C7)' }}>
      <div className="text-center max-w-md w-full">
        <div className="text-4xl font-bold text-[#3A2F2F] mb-2">❤️</div>
        <h1 className="text-4xl font-extrabold text-[#3A2F2F] font-playfair">Namakamu</h1>
        <p className="text-lg text-[#6B6B6B] mt-1 mb-6">A secret space for two hearts.</p>

        <button
          onClick={createRoom}
          className="bg-[#D9644A] hover:bg-[#c6533b] text-white text-lg font-semibold py-3 px-6 rounded-full w-full mb-4 shadow-md transition"
        >
          Create Room
        </button>

        <div className="bg-[#FFF8ED] rounded-2xl p-6 mt-4 shadow-inner">
          <input
            placeholder="Enter Room ID"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            className="w-full text-center text-lg rounded-xl border border-[#D9D9D9] py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#D9644A] text-[#5C5C5C]"
          />
          <button
            onClick={joinRoom}
            className="bg-[#D9644A] hover:bg-[#c6533b] text-white font-semibold py-3 px-6 rounded-full w-full shadow transition"
          >
            Join Room
          </button>
        </div>

        <button
          className="mt-6 bg-[#FFF2DC] text-[#3A2F2F] font-semibold py-3 px-6 rounded-xl w-full shadow border border-[#FFC062] flex items-center justify-center gap-2"
        >
          <span role="img" aria-label="lock">🔒</span> Shared memories
        </button>
      </div>
    </div>
  );
};

export default Home;
