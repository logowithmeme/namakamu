import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const JoinRoomPage = () => {
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleJoin = async () => {
    if (!roomId.trim() || !name.trim()) {
      setError('Please enter both Room ID and your name.');
      return;
    }

    try {
      const roomRef = doc(db, 'chatrooms', roomId);
      const roomSnap = await getDoc(roomRef);

      if (roomSnap.exists()) {
        localStorage.setItem(`username-${roomId}`, name);
        navigate(`/chat/${roomId}`);
      } else {
        setError('Room not found. Please check the ID again.');
      }
    } catch (err) {
      console.error('Join Error:', err);
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 px-4">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">Join Room</h1>

      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        className="mb-4 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none w-full max-w-xs"
      />

      <input
        type="text"
        placeholder="Enter Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-6 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none w-full max-w-xs"
      />

      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

      <button
        onClick={handleJoin}
        className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 transition shadow-lg"
      >
        Join Room
      </button>
    </div>
  );
};

export default JoinRoomPage;