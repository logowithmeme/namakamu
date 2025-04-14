import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Home = () => {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    // Temporarily skip creation logic
    alert('Room Created! (UI only)');
  };

  const handleJoinRoom = () => {
    // Temporarily skip join logic
    alert('Joining Room... (UI only)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 flex flex-col items-center justify-center px-4">
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">❤️</div>
        <h1 className="text-5xl font-bold text-gray-800 mb-2">Namakamu</h1>
        <p className="text-lg text-gray-600">A secret space for two hearts.</p>
      </div>

      <div className="space-y-4 w-full max-w-xs">
        <button
          onClick={handleCreateRoom}
          className="w-full bg-rose-400 text-white text-lg py-3 rounded-full shadow-lg hover:bg-rose-500 transition"
        >
          Create Room
        </button>

        <button
          onClick={handleJoinRoom}
          className="w-full bg-orange-300 text-white text-lg py-3 rounded-full shadow-lg hover:bg-orange-400 transition"
        >
          Join Room
        </button>

        <div className="mt-8">
          <button
            onClick={() => alert('Feature coming soon...')}
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
