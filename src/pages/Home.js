// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const navigate = useNavigate();

  const handleGenerateRoom = () => {
    const roomId = uuidv4().slice(0, 8);
    navigate(`/chat/${roomId}`);
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    const input = document.getElementById('roomInput').value.trim();
    if (input) {
      navigate(`/chat/${input}`);
    } else {
      alert('Please enter a valid Room ID');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to Namakamu</h1>

      <div className="flex flex-col space-y-4">
        <button
          onClick={handleGenerateRoom}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-xl shadow"
        >
          💚 Generate Room
        </button>

        <form onSubmit={handleJoinRoom} className="flex flex-col items-center space-y-2">
          <input
            id="roomInput"
            type="text"
            placeholder="Enter Room ID"
            className="px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-xl shadow"
          >
            💙 Join Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
