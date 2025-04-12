import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [roomId, setRoomId] = useState('');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const newRoomId = uuidv4().split('-')[0];
    setRoomId(newRoomId);
    setCopied(false);
  };

  const handleCopy = () => {
    const link = `${window.location.origin}/chat/${roomId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
  };

  const handleJoinRoom = () => {
    if (roomId) {
      navigate(`/chat/${roomId}`);
    }
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

      {roomId && (
        <div className="mt-6 text-center">
          <p className="text-lg mb-2 font-medium">Room Link:</p>
          <div className="bg-white px-4 py-2 rounded-lg border border-gray-300">
            <code className="text-blue-600">{`${window.location.origin}/chat/${roomId}`}</code>
          </div>
          <div className="mt-4 flex gap-4 justify-center">
            <button
              onClick={handleCopy}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              {copied ? '✅ Copied!' : '📋 Copy Link'}
            </button>
            <button
              onClick={handleJoinRoom}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              🚪 Enter Room
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
