// RoomCreated.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const RoomCreated = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const createRoom = async () => {
      const id = uuidv4().slice(0, 8);
      await setDoc(doc(db, 'chatrooms', id), {
        createdAt: new Date().toISOString(),
      });
      setRoomId(id);
    };

    createRoom();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
    alert('Room ID copied to clipboard!');
  };

  const handleStartChat = () => {
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 px-4">
      <h1 className="text-3xl font-bold text-purple-800 mb-2">🎉 Room Created</h1>
      <p className="text-lg text-gray-700 mb-1">Share this Room ID with your partner:</p>
      <p className="text-2xl font-semibold text-indigo-700 bg-white px-4 py-2 rounded-xl shadow-sm mb-3">
        {roomId || 'Generating...'}
      </p>

      <button
        onClick={handleCopy}
        className="bg-white text-purple-800 py-2 px-6 rounded-full shadow-md hover:bg-purple-200 transition mb-3"
      >
        Copy Room ID
      </button>

      <button
        onClick={handleStartChat}
        className="bg-pink-500 text-white py-2 px-8 rounded-full shadow-lg hover:bg-pink-600 transition"
      >
        Enter Chat Room
      </button>
    </div>
  );
};

export default RoomCreated;
