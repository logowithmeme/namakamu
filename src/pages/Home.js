import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const navigate = useNavigate();

  const handleCreateLink = () => {
    const roomId = uuidv4().slice(0, 8);
    navigate(`/chat/${roomId}`);
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    const roomCode = e.target.elements.roomCode.value.trim();
    if (roomCode) {
      navigate(`/chat/${roomCode}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-yellow-100 text-center p-6">
      <div className="text-5xl font-bold text-purple-900 mb-2">❤️ Namakamu</div>
      <p className="text-lg text-gray-700 mb-6">A secret space for two hearts.</p>

      <button
        className="bg-rose-400 hover:bg-rose-500 text-white font-semibold py-3 px-6 rounded-full text-lg mb-4 transition"
        onClick={handleCreateLink}
      >
        Create a private link
      </button>

      <form onSubmit={handleJoinRoom} className="bg-white p-4 rounded-xl shadow-md w-full max-w-sm mt-2">
        <input
          type="text"
          name="roomCode"
          placeholder="Enter Room ID"
          className="w-full p-2 mb-3 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-medium"
        >
          Join Room
        </button>
      </form>

      <div className="bg-white mt-10 p-4 rounded-xl shadow-md w-full max-w-md space-y-4">
        <p className="text-lg font-medium">🔧 Features Coming Up</p>
        <ul className="text-left list-disc list-inside text-sm text-gray-700">
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
