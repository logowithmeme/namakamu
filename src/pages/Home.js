// src/pages/Home.js (Final polished Room ID copy button style)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const Home = () => {
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = useState('');
  const [roomId, setRoomId] = useState(null);

  const generateRoom = async () => {
    const newRoomId = Math.random().toString(36).substring(2, 10);
    await setDoc(doc(db, 'rooms', newRoomId), { createdAt: Date.now() });
    localStorage.setItem(`creator-${newRoomId}`, Date.now().toString());
    setRoomId(newRoomId);
  };

  const enterRoom = () => {
    if (!roomId) return;
    navigate(`/chat/${roomId}`);
  };

  const joinRoom = async () => {
    const ref = doc(db, 'rooms', joinCode);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      navigate(`/chat/${joinCode}`);
    } else {
      alert('Room not found');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FFD9E2] to-[#FFE6EB] p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <div className="text-4xl font-extrabold text-[#e11d48] mb-1">❤️</div>
        <h1 className="text-4xl font-black mb-2 text-[#1c1b1f] font-serif">Namakamu</h1>
        <p className="text-[#444] text-md italic mb-6">A secret space for two hearts.</p>

        <button
          onClick={generateRoom}
          className="w-full bg-pink-300 hover:bg-pink-400 text-black font-semibold text-lg py-3 rounded-full shadow-md mb-4 transition"
        >
          Create Room
        </button>

        {roomId && (
          <div className="text-center text-sm text-[#333] mb-3 flex items-center justify-center gap-2">
            Room ID: <span className="font-mono font-bold text-black">{roomId}</span>
            <button
              onClick={() => navigator.clipboard.writeText(roomId)}
              className="px-3 py-1 text-sm font-medium bg-pink-300 hover:bg-pink-400 text-black rounded-full shadow-md transition"
            >
              Copy
            </button>
          </div>
        )}

        <div className="bg-[#ffeef2] p-4 rounded-xl shadow-inner mb-4">
          <input
            className="w-full border border-pink-300 p-3 text-center rounded-full mb-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Enter Room ID"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
          />
          <button
            onClick={joinRoom}
            className="w-full bg-pink-300 hover:bg-pink-400 text-black font-semibold text-lg py-3 rounded-full shadow-md transition"
          >
            Join Room
          </button>
        </div>

        <button
          className="w-full bg-white border border-yellow-300 py-3 rounded-full shadow-sm mt-4 flex items-center justify-center gap-2 hover:bg-yellow-50 transition"
        >
          <span className="text-yellow-500 text-lg">🔒</span> <span className="text-black font-semibold">Shared memories</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
