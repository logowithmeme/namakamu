import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, get, child } from 'firebase/database';

const JoinRoomPage = () => {
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleJoinRoom = async () => {
    if (!roomId.trim() || !name.trim()) {
      setError('Please enter both Room ID and your name.');
      return;
    }

    const dbRef = ref(getDatabase());
    try {
      const snapshot = await get(child(dbRef, `rooms/${roomId}`));
      if (snapshot.exists()) {
        navigate(`/chat/${roomId}`, { state: { name } });
      } else {
        setError('Room not found. Please check the Room ID.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-4">Join a Room</h2>

        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 mb-4 focus:outline-none"
        />

        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 mb-4 focus:outline-none"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleJoinRoom}
          className="w-full py-3 rounded-full bg-pink-400 text-white font-semibold hover:bg-pink-500 transition"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default JoinRoomPage;