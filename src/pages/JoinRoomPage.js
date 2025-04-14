import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const JoinRoomPage = () => {
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleJoin = async () => {
    if (!roomId || !name) {
      alert('Please enter both Room ID and your name');
      return;
    }

    const roomRef = doc(db, 'chatrooms', roomId);
    const roomSnap = await getDoc(roomRef);

    if (roomSnap.exists()) {
      localStorage.setItem('userName', name);
      localStorage.setItem('userType', 'joiner');
      navigate(`/chat/${roomId}`);
    } else {
      alert('Room not found. Please check the Room ID.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Join a Chat Room</h2>

        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
          className="w-full px-4 py-3 rounded-md border border-purple-200 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Your Name"
          className="w-full px-4 py-3 rounded-md border border-purple-200 mb-6 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <button
          onClick={handleJoin}
          className="bg-purple-500 text-white w-full py-3 rounded-full hover:bg-purple-600 transition"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default JoinRoomPage;