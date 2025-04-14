import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinRoomPage = () => {
  const [roomCode, setRoomCode] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if (!roomCode.trim() || !name.trim()) {
      alert('Please enter both Room ID and your name.');
      return;
    }

    localStorage.setItem(`name-${roomCode}`, name);
    navigate(`/chat/${roomCode}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-4">Join Room</h1>
        <p className="text-center mb-6 text-gray-600">Enter the Room ID shared by your partner</p>

        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <button
          onClick={handleJoinRoom}
          className="w-full bg-purple-600 text-white py-3 rounded-full hover:bg-purple-700 transition"
        >
          Enter Room
        </button>
      </div>
    </div>
  );
};

export default JoinRoomPage;