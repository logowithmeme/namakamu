// src/pages/RoomCreated.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const RoomCreated = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleStartChat = () => {
    if (!name.trim()) {
      alert("Please enter your name!");
      return;
    }
    localStorage.setItem(`creator-${roomId}`, name.trim());
    navigate(`/chat/${roomId}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomId);
    alert("Room ID copied!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-center" style={{ background: 'linear-gradient(135deg, #FCE4EC, #F3E5F5)' }}>
      <div className="bg-white bg-opacity-50 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <h1 className="text-2xl md:text-3xl font-bold text-[#3A2F2F] mb-2">Chat Room Created</h1>
        <p className="text-lg text-[#3A2F2F]">Room ID:</p>
        <div className="text-3xl font-bold font-mono text-[#4A148C] mt-1 mb-4">{roomId}</div>
        <p className="text-[#3A2F2F] mb-6">Share this code with your partner to join.</p>

        <input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full text-center text-lg rounded-xl border border-gray-300 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#E4685D]"
        />

        <button
          onClick={copyToClipboard}
          className="w-full mb-3 bg-[#FFF7F0] text-[#3A2F2F] py-3 rounded-full font-semibold shadow border border-gray-300 hover:brightness-110"
        >
          Copy Room ID
        </button>

        <button
          onClick={handleStartChat}
          className="w-full bg-[#E4685D] text-white py-3 rounded-full font-semibold shadow hover:brightness-110 transition"
        >
          Start Chatting
        </button>
      </div>
    </div>
  );
};

export default RoomCreated;
