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
      alert('Please enter Room ID and your name.');
      return;
    }

    const roomRef = doc(db, 'chatrooms', roomId);
    const roomSnap = await getDoc(roomRef);

    if (roomSnap.exists()) {
      localStorage.setItem(`name-${roomId}`, name);
      navigate(`/chat/${roomId}`);
    } else {
      alert('Room Not Found! Check the ID and try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-100 via-yellow-100 to-pink-100 px-4">
      <h1 className="text-3xl font-bold text-orange-700 mb-6">Join a Chat Room</h1>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <input
          type="text"
          placeholder="Enter Room ID"
          className="px-4 py-2 rounded-full border border-orange-300 focus:outline-none"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Your Name"
          className="px-4 py-2 rounded-full border border-orange-300 focus:outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={handleJoin}
          className="bg-orange-400 hover:bg-orange-500 text-white py-3 rounded-full shadow-lg transition"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default JoinRoomPage;
