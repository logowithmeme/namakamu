// src/pages/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [roomIdInput, setRoomIdInput] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    const roomId = uuidv4();
    const name = prompt('Your name:');
    if (!name) return;

    localStorage.setItem(`creator-${roomId}`, name);

    await addDoc(collection(db, 'rooms'), { roomId });
    navigate(`/chat/${roomId}`);
  };

  const handleJoinRoom = () => {
    if (!roomIdInput.trim()) return;
    const name = prompt('Your name:');
    if (!name) return;

    localStorage.setItem(`joiner-${roomIdInput}`, name);
    navigate(`/chat/${roomIdInput}`);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100 px-4">
      <div className="text-center space-y-6 max-w-sm w-full">
        <h1 className="text-3xl font-bold text-pink-700 mb-6">💖 Namakamu</h1>

        <button
          onClick={handleCreateRoom}
          className="w-full py-3 rounded-xl bg-pink-500 text-white text-lg shadow-lg hover:bg-pink-600 transition"
        >
          💡 Create Room
        </button>

        <input
          type="text"
          value={roomIdInput}
          onChange={(e) => setRoomIdInput(e.target.value)}
          placeholder="Enter Room ID"
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
        />

        <button
          onClick={handleJoinRoom}
          className="w-full py-3 rounded-xl bg-purple-500 text-white text-lg shadow-lg hover:bg-purple-600 transition"
        >
          🚪 Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
