// Home.js - Updated with Room Creation & Join Logic 💬
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const navigate = useNavigate();
  const [joinId, setJoinId] = useState('');
  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);

  const handleCreateRoom = async () => {
    setCreating(true);
    const newRoomId = uuidv4().slice(0, 8);
    await setDoc(doc(db, 'rooms', newRoomId), {
      createdAt: Date.now(),
    });
    localStorage.setItem(`creator-${newRoomId}`, Date.now().toString());
    navigate(`/chat/${newRoomId}`);
  };

  const handleJoinRoom = async () => {
    if (!joinId.trim()) return;
    setJoining(true);
    const roomRef = doc(db, 'rooms', joinId);
    const roomSnap = await getDoc(roomRef);
    if (roomSnap.exists()) {
      navigate(`/chat/${joinId}`);
    } else {
      alert('Room not found!');
    }
    setJoining(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100 text-center p-4">
      <h1 className="text-4xl font-bold text-pink-800 mb-8">💗 Welcome to Namakamu</h1>

      <button
        onClick={handleCreateRoom}
        disabled={creating}
        className="mb-6 bg-green-400 hover:bg-green-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
      >
        {creating ? 'Creating Room...' : 'Create Room'}
      </button>

      <div className="mb-6 w-full max-w-xs">
        <input
          type="text"
          placeholder="Enter Room ID"
          value={joinId}
          onChange={(e) => setJoinId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-full text-center"
        />
      </div>

      <button
        onClick={handleJoinRoom}
        disabled={joining}
        className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition"
      >
        {joining ? 'Joining...' : 'Join Room'}
      </button>
    </div>
  );
};

export default Home;
