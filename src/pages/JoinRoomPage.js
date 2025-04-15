// src/pages/JoinRoomPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

const JoinRoomPage = () => {
  const { roomId } = useParams();
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleJoin = async () => {
    if (!name.trim()) return;

    const roomRef = doc(db, 'rooms', roomId);
    const roomSnap = await getDoc(roomRef);

    if (!roomSnap.exists()) {
      alert('Room not found 😢');
      return;
    }

    const messagesRef = collection(db, 'rooms', roomId, 'messages');
    const messagesSnap = await getDocs(messagesRef);

    const uniqueSenders = new Set();
    messagesSnap.forEach((doc) => {
      const data = doc.data();
      if (data.sender) uniqueSenders.add(data.sender);
    });

    if (uniqueSenders.size >= 2 && !localStorage.getItem(`joiner-name-${roomId}`)) {
      alert('This room is already full 👥');
      return;
    }

    localStorage.setItem(`joiner-name-${roomId}`, name);
    navigate(`/chat/${roomId}`);
  };

  if (!roomId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100">
        <div className="text-red-600 font-semibold text-lg">Invalid Room ID. Go back.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sunset1 to-sunset2 p-4">
      <div className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <div className="text-3xl font-bold text-textAccent mb-2">Join Chat Room</div>
        <p className="text-md text-textAccent font-semibold mb-6">
          Room ID: <span className="font-mono font-bold">{roomId}</span>
        </p>

        <input
          type="text"
          className="w-full px-4 py-3 mb-4 rounded-full border border-gray-300 text-center text-gray-700 focus:outline-none"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={handleJoin}
          className="w-full bg-btn hover:bg-btnHover text-white font-semibold py-3 rounded-full shadow transition"
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

export default JoinRoomPage;
