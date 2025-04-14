import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const JoinRoomPage = () => {
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleJoinRoom = async () => {
    if (!roomId || !name) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      const roomRef = doc(db, 'rooms', roomId);
      const roomSnap = await getDoc(roomRef);

      if (roomSnap.exists()) {
        localStorage.setItem('userName', name);
        navigate(`/chat/${roomId}`);
      } else {
        setError('Room ID not found. Please check and try again.');
      }
    } catch (err) {
      setError('Something went wrong. Try again later.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-purple-700 mb-6">Join a Room</h1>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          onClick={handleJoinRoom}
          className="w-full bg-pink-500 text-white text-lg py-3 rounded-full shadow-md hover:bg-pink-600 transition"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default JoinRoomPage;
