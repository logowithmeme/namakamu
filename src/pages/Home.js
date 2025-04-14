import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 flex flex-col items-center justify-center px-4">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">❤️</div>
        <h1 className="text-5xl font-bold text-gray-800 mb-2">Namakamu</h1>
        <p className="text-lg text-gray-600">A secret space for two hearts.</p>
      </div>

      <div className="space-y-4 w-full max-w-xs">
        <button
          onClick={() => navigate('/room')}
          className="w-full bg-purple-200 text-white text-lg py-3 rounded-full shadow-lg hover:bg-purple-300 transition"
        >
          Create Room
        </button>

        <button
          onClick={() => navigate('/join')}
          className="w-full bg-purple-200 text-white text-lg py-3 rounded-full shadow-lg hover:bg-purple-300 transition"
        >
          Join Room
        </button>

        <div className="mt-8">
          <button
            className="w-full bg-yellow-100 text-gray-800 py-3 rounded-full shadow-md flex items-center justify-center gap-2 hover:bg-yellow-200"
          >
            <span role="img" aria-label="lock">🔒</span> Shared memories
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;