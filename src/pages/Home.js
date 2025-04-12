import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [roomInput, setRoomInput] = useState('');
  const navigate = useNavigate();

  const createRoom = () => {
    const newRoomId = uuidv4().slice(0, 8);
    navigate(`/room/${newRoomId}`);
  };

  const joinRoom = () => {
    if (roomInput.trim() !== '') {
      navigate(`/room/${roomInput.trim()}`);
    } else {
      alert('Please enter a valid Room ID');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-blue-600">Welcome to Namakamu 💬</h1>
        <p className="mb-6 text-gray-600">Start a private chat room or join one by ID</p>

        {/* Create Room Button */}
        <button
          onClick={createRoom}
          className="bg-green-500 text-white px-6 py-3 rounded-md mb-6 w-full hover:bg-green-600"
        >
          🚀 Create New Chat Room
        </button>

        {/* Divider */}
        <div className="border-t my-4" />

        {/* Join Room Input */}
        <input
          type="text"
          placeholder="Enter Room ID (e.g. 38cc95cc)"
          value={roomInput}
          onChange={(e) => setRoomInput(e.target.value)}
          className="border p-2 w-full rounded mb-3"
        />
        <button
          onClick={joinRoom}
          className="bg-blue-500 text-white px-6 py-2 rounded-md w-full hover:bg-blue-600"
        >
          🔑 Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
