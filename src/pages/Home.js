// Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 px-4">
      <h1 className="text-5xl font-bold text-purple-800 mb-6">Namakamu 💖</h1>
      <p className="mb-10 text-gray-600">A secret chat for just two hearts.</p>
      <div className="space-y-4 w-full max-w-xs">
        <button
          onClick={() => navigate('/room-created')}
          className="w-full bg-rose-400 text-white text-lg py-3 rounded-full shadow-lg hover:bg-rose-500 transition"
        >
          Create Room
        </button>

        <button
          onClick={() => navigate('/join-room')}
          className="w-full bg-orange-300 text-white text-lg py-3 rounded-full shadow-lg hover:bg-orange-400 transition"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
