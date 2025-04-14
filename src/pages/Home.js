// src/pages/Home.js (Romantic Coral-Peach Theme Buttons)
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#FFE7D0] to-[#FDD6B8] p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <div className="text-4xl font-extrabold text-[#e11d48] mb-1">❤️</div>
        <h1 className="text-4xl font-bold mb-1 text-[#301934] font-serif">Namakamu</h1>
        <p className="text-[#5B4B4B] text-md mb-6">A secret space for two hearts.</p>

        <button
          onClick={generateRoom}
          className="w-full bg-[#FF4F81] hover:bg-[#ff3366] text-white font-semibold text-lg py-3 rounded-full shadow-md mb-4 transition"
        >
          Create Room
        </button>

        {roomId && (
          <div className="text-center text-sm text-gray-700 mb-3">
            Room ID: <span className="font-mono font-bold">{roomId}</span>
            <button
              onClick={() => navigator.clipboard.writeText(roomId)}
              className="ml-2 text-pink-600 underline text-xs"
            >
              Copy
            </button>
          </div>
        )}

        <div className="bg-[#FFF3EA] p-4 rounded-xl shadow-inner mb-4">
          <input
            className="w-full border border-[#F7CACA] p-3 text-center rounded-full mb-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF4F81]"
            placeholder="Enter Room ID"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
          />
          <button
            onClick={joinRoom}
            className="w-full bg-[#FF4F81] hover:bg-[#ff3366] text-white font-semibold text-lg py-3 rounded-full shadow-md transition"
          >
            Join Room
          </button>
        </div>

        <button
          className="w-full bg-white text-[#e11d48] border border-[#fbbf24] py-3 rounded-full shadow-sm mt-4 flex items-center justify-center gap-2 hover:bg-[#fff0e6]"
        >
          <span className="text-yellow-500">🔒</span> <span className="font-semibold">Shared memories</span>
        </button>
      </div>
    </div>
  );
};

export default Home;