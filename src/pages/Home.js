// src/pages/Home.js (Better styling with modern glow 💖)
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFF0EC] to-[#FFE9D8] p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center border border-[#fbc8b3]">
        <div className="text-4xl font-extrabold text-[#ff3366] mb-1">❤️</div>
        <h1 className="text-4xl font-black mb-2 text-[#2d1a1a] font-serif">Namakamu</h1>
        <p className="text-[#4B4B4B] text-md mb-6 italic">A secret space for two hearts.</p>

        <button
          onClick={generateRoom}
          className="w-full bg-gradient-to-r from-[#ff4d6d] to-[#ff6e8a] text-white font-semibold text-lg py-3 rounded-full shadow-lg mb-4 hover:brightness-110 transition"
        >
          Create Room
        </button>

        {roomId && (
          <div className="text-center text-sm text-[#444] mb-3">
            Room ID: <span className="font-mono font-bold text-[#1f1f1f]">{roomId}</span>
            <button
              onClick={() => navigator.clipboard.writeText(roomId)}
              className="ml-2 text-[#e11d48] underline text-sm hover:text-[#c3142e]"
            >
              Copy
            </button>
          </div>
        )}

        <div className="bg-[#fff2ea] p-4 rounded-xl shadow-inner mb-4">
          <input
            className="w-full border border-[#fbc8b3] p-3 text-center rounded-full mb-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF4F81]"
            placeholder="Enter Room ID"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
          />
          <button
            onClick={joinRoom}
            className="w-full bg-gradient-to-r from-[#ff4d6d] to-[#ff6e8a] text-white font-semibold text-lg py-3 rounded-full shadow-md transition hover:brightness-110"
          >
            Join Room
          </button>
        </div>

        <button
          className="w-full bg-[#fffdfc] border border-[#f9c56c] py-3 rounded-full shadow-sm mt-4 flex items-center justify-center gap-2 hover:bg-[#fff4ec] transition"
        >
          <span className="text-yellow-500 text-lg">🔒</span> <span className="text-[#1a1a1a] font-semibold">Shared memories</span>
        </button>
      </div>
    </div>
  );
};

export default Home;