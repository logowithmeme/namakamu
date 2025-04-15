import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

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

    localStorage.setItem(`joiner-name-${roomId}`, name);
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#ffecd2] to-[#fcb69f] p-4">
      <div className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-[#3f1d1d] mb-2">Join Chat Room</h2>
        <p className="text-md text-[#3f1d1d] font-semibold mb-6">
          Room ID: <span className="font-mono font-bold">{roomId}</span>
        </p>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 mb-4 rounded-full border border-gray-300 text-center"
        />
        <button
          onClick={handleJoin}
          className="w-full bg-[#f97373] hover:bg-[#ef4444] text-white font-semibold py-3 rounded-full shadow transition"
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

export default JoinRoomPage;
