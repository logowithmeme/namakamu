import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinRoomPage = () => {
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!roomId.trim() || !name.trim()) {
      alert('Please enter both Room ID and your name.');
      return;
    }
    localStorage.setItem(`creator-${roomId}`, Date.now().toString() + '-joiner');
    localStorage.setItem(`username-${roomId}`, name);
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 via-yellow-100 to-pink-100 px-4">
      <h1 className="text-3xl font-bold text-orange-800 mb-4">Join a Room</h1>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="w-full max-w-xs px-4 py-3 mb-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
      />
      <input
        type="text"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full max-w-xs px-4 py-3 mb-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
      />
      <button
        onClick={handleJoin}
        className="w-full max-w-xs bg-orange-400 text-white text-lg py-3 rounded-full shadow-lg hover:bg-orange-500 transition"
      >
        Join Room
      </button>
    </div>
  );
};

export default JoinRoomPage;