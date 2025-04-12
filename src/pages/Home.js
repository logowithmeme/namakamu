// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const roomId = uuidv4().split('-')[0];
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-4">💬 Welcome to Namakamu</h1>
      <p className="text-lg mb-6">Create a private chat and share the link with one person</p>
      <button
        onClick={handleCreateRoom}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Create a Private Link 🔐
      </button>
    </div>
  );
};

export default Home;
