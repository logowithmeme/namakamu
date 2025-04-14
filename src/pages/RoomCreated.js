import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const RoomCreated = () => {
  const [roomId, setRoomId] = useState(uuidv4().slice(0, 8)); // generate instantly
  const navigate = useNavigate();

  useEffect(() => {
    const createRoom = async () => {
      await setDoc(doc(db, 'chatrooms', roomId), {
        createdAt: new Date().toISOString(),
      });
    };
    createRoom();
  }, [roomId]);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
    alert('Room ID copied!');
  };

  const handleStartChat = () => {
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 px-4">
      <h1 className="text-3xl font-bold text-purple-800 mb-2">Chat Room Created</h1>
      <p className="text-lg mb-4">Room ID:</p>
      <p className="text-4xl font-bold text-indigo-700 mb-6">{roomId}</p>
      <p className="mb-4 text-center">Share this code with your partner to join.</p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={handleCopy}
          className="bg-white text-purple-800 py-3 rounded-full shadow-md hover:bg-purple-100 transition"
        >
          Copy Room ID
        </button>

        <button
          onClick={handleStartChat}
          className="bg-pink-400 text-white py-3 rounded-full shadow-lg hover:bg-pink-500 transition"
        >
          Start Chatting
        </button>
      </div>
    </div>
  );
};

export default RoomCreated;
