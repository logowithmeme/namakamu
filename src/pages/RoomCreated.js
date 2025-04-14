// src/pages/RoomCreated.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const RoomCreated = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleStartChat = () => {
    if (!name.trim()) {
      alert("Please enter your name!");
      return;
    }
    localStorage.setItem(`creator-${roomId}`, name.trim());
    navigate(`/chat/${roomId}`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(roomId);
    alert("Room ID copied!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-center" style={{ background: 'linear-gradient(to bottom right, #FFE7D0, #FEE5C7)' }}>
      <div className="bg-[#FFF8ED] rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <h1 className="text-3xl font-bold text-[#3A2F2F] mb-2 font-playfair">Chat Room Created</h1>
        <p className="text-[#3A2F2F] text-lg">Room ID:</p>
        <div className="text-2xl font-bold font-mono text-[#4A148C] mt-1 mb-4">{roomId}</div>
        <p className="text-[#6B6B6B] mb-6">Share this code with your partner to join.</p>

        <input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full text-center text-lg rounded-xl border border-[#D9D9D9] py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-[#D9644A] text-[#5C5C5C] bg-white"
        />

        <button
          onClick={copyToClipboard}
          className="w-full mb-3 bg-white text-[#D9644A] border border-[#D9644A] hover:bg-[#FFE6E1] py-3 rounded-full font-semibold shadow-md transition"
        >
          Copy Room ID
        </button>

        <button
          onClick={handleStartChat}
          className="w-full bg-[#D9644A] hover:bg-[#c6533b] text-white py-3 rounded-full font-semibold shadow-md transition"
        >
          Start Chatting
        </button>
      </div>
    </div>
  );
};

export default RoomCreated;


// src/pages/JoinRoomPage.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const JoinRoomPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [name, setName] = useState('');

  const handleJoin = async () => {
    if (!name.trim()) return alert("Please enter your name!");
    const ref = doc(db, 'rooms', roomId);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      alert("Invalid Room ID. Room doesn't exist.");
      return;
    }

    localStorage.setItem(`joiner-name-${roomId}`, name.trim());
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(to bottom right, #FFE7D0, #FEE5C7)' }}>
      <div className="text-center max-w-md w-full bg-[#FFF8ED] bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-[#3A2F2F] mb-4 font-playfair">Join Chat Room</h2>
        <p className="text-[#3A2F2F] text-sm mb-6">Room ID: <span className="font-mono font-bold">{roomId}</span></p>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 py-3 px-4 rounded-xl border border-[#D9D9D9] text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#D9644A] text-[#5C5C5C] bg-white"
        />

        <button
          onClick={handleJoin}
          className="w-full bg-white text-[#D9644A] border border-[#D9644A] hover:bg-[#FFE6E1] font-semibold py-3 rounded-full shadow-md transition"
        >
          Join Now
        </button>
      </div>
    </div>
  );
};

export default JoinRoomPage;