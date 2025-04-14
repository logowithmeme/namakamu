// src/pages/JoinRoomPage.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const JoinRoomPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [name, setName] = useState('');

  const handleJoin = async () => {
    if (!name.trim()) return alert("Please enter your name!");

    const ref = doc(db, 'rooms', roomId);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      alert("Invalid Room ID. Room doesn't exist.");
      return;
    }

    localStorage.setItem(`joiner-name-${roomId}`, name.trim());
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(135deg, #FFE1D3, #FEECEB)' }}>
      <div className="text-center max-w-md w-full bg-white bg-opacity-50 backdrop-blur-md p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-[#3A2F2F] mb-4">Join Chat Room</h2>
        <p className="text-[#3A2F2F] text-sm mb-6">Room ID: <span className="font-mono font-bold">{roomId}</span></p>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 py-3 px-4 rounded-full border border-gray-300 text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#E4685D]"
        />

        <button
          onClick={handleJoin}
          className="w-full bg-[#FF867C] text-white font-semibold py-3 rounded-full shadow hover:brightness-110"
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

export default JoinRoomPage;
