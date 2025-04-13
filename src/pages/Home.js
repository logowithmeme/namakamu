import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const navigate = useNavigate();
  const [joinId, setJoinId] = useState('');
  const [roomCreated, setRoomCreated] = useState(false);
  const [roomId, setRoomId] = useState('');

  const handleCreateRoom = () => {
    const newRoomId = uuidv4().slice(0, 8);
    localStorage.setItem(`creator-${newRoomId}`, Date.now().toString());
    setRoomId(newRoomId);
    setRoomCreated(true);
    navigator.clipboard.writeText(newRoomId);
    setTimeout(() => navigate(`/chat/${newRoomId}`), 1500);
  };

  const handleJoinRoom = () => {
    if (joinId.trim()) {
      navigate(`/chat/${joinId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-pink-600">💗 Namakamu</h1>

        {roomCreated ? (
          <div>
            <p className="text-lg text-gray-700">✅ Room Created</p>
            <p className="text-pink-500 font-semibold my-2 text-xl">{roomId}</p>
            <p className="text-sm text-gray-400">Copied to clipboard</p>
          </div>
        ) : (
          <>
            <button
              onClick={handleCreateRoom}
              className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 rounded-full w-full mb-4 transition"
            >
              🔐 Create Room
            </button>

            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Enter Room ID"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
                value={joinId}
                onChange={(e) => setJoinId(e.target.value)}
              />
            </div>

            <button
              onClick={handleJoinRoom}
              className="bg-blue-400 hover:bg-blue-500 text-white px-6 py-3 rounded-full w-full transition"
            >
              🔓 Join Room
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
