import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');

  const handleCreateRoom = () => {
    const newRoomId = uuidv4().slice(0, 8);
    navigate(`/chat/${newRoomId}?creator=true`);
  };

  const handleJoinRoom = () => {
    if (roomId.trim() !== '') {
      navigate(`/chat/${roomId}?creator=false`);
    } else {
      alert('Please enter a valid Room ID');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-2">❤️ Namakamu</h1>
      <p className="text-lg mb-6 text-gray-700">A secret space for two hearts.</p>

      <div className="flex gap-4 mb-4">
        <button
          onClick={handleCreateRoom}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Create Room
        </button>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
          <button
            onClick={handleJoinRoom}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Join Room
          </button>
        </div>
      </div>

      <div className="mt-10 text-left w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">🛠️ Features Coming Up</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>💬 Real-time two-way chat</li>
          <li>🖼 Upload images</li>
          <li>🔐 Private message view by code or user ID</li>
          <li>🌈 Beautiful Tailwind UI</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
