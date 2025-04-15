// src/pages/JoinRoomPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const JoinRoomPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [roomExists, setRoomExists] = useState(true);

  useEffect(() => {
    const checkRoom = async () => {
      const ref = doc(db, 'rooms', roomId);
      const snap = await getDoc(ref);
      if (!snap.exists()) setRoomExists(false);
    };
    checkRoom();
  }, [roomId]);

  const handleJoin = () => {
    if (!name.trim()) return;
    localStorage.setItem(`joiner-name-${roomId}`, name);
    navigate(`/chat/${roomId}`);
  };

  if (!roomExists) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100">
        <p className="text-red-600 font-bold text-xl">Room Not Found 😓</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#ffecd2] to-[#fcb69f] p-4">
      <div className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-[#3f1d1d] mb-2">Enter Your Name</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 mb-4 rounded-full border border-gray-300 text-center text-gray-800"
        />
        <button
          onClick={handleJoin}
          className="w-full bg-[#f97373] hover:bg-[#ef4444] text-white font-semibold py-3 rounded-full shadow transition"
        >
          Join Chat
        </button>
      </div>
    </div>
  );
};

export default JoinRoomPage;
