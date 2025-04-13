import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [joinRoomId, setJoinRoomId] = useState('');
  const [createdRoomId, setCreatedRoomId] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const roomId = uuidv4().slice(0, 8); // Short unique ID
    localStorage.setItem(`creator-${roomId}`, Date.now().toString());
    setCreatedRoomId(roomId);
  };

  const handleEnterCreatedRoom = () => {
    if (createdRoomId) navigate(`/chat/${createdRoomId}`);
  };

  const handleJoinRoom = () => {
    if (joinRoomId.trim() !== '') {
      navigate(`/chat/${joinRoomId}`);
    } else {
      alert('Please enter a Room ID');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100 flex flex-col items-center justify-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-pink-600">💖 Namakamu</h1>
        
        {/* Create Room Section */}
        <button
          onClick={handleCreateRoom}
          className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded-full font-semibold mb-4 transition"
        >
          + Create Room
        </button>

        {createdRoomId && (
          <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
            <p className="text-gray-700 font-semibold">Room ID:</p>
            <div className="flex items-center justify-between mt-2">
              <span className="font-mono">{createdRoomId}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(createdRoomId);
                  alert('Room ID copied!');
                }}
                className="text-sm text-blue-500 underline"
              >
                Copy
              </button>
            </div>
            <button
              onClick={handleEnterCreatedRoom}
              className="mt-3 bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600"
            >
              Enter Room
            </button>
          </div>
        )}

        {/* Divider */}
        <div className="my-4 border-t border-gray-300"></div>

        {/* Join Room Section */}
        <input
          type="text"
          placeholder="Enter Room ID"
          className="w-full px-4 py-2 border rounded-full mb-3 focus:outline-none"
          value={joinRoomId}
          onChange={(e) => setJoinRoomId(e.target.value)}
        />
        <button
          onClick={handleJoinRoom}
          className="bg-purple-500 hover:bg-purple-600 text-white w-full py-2 rounded-full font-semibold transition"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
