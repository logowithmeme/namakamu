import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinRoomPage = () => {
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!roomId || !name) {
      alert('Please enter both Room ID and your name.');
      return;
    }
    localStorage.setItem(`joiner-name-${roomId}`, name);
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-pink-600">Join a Chat Room</h1>

        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300"
        />

        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mb-6 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300"
        />

        <button
          onClick={handleJoin}
          className="w-full bg-pink-400 text-white py-3 rounded-full hover:bg-pink-500 transition"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default JoinRoomPage;
