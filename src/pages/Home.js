// ✅ STEP 2: Create Room + Join Room functionality with Firebase
// 📍 File: Home.js (Your styled version remains intact)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, getDoc, doc, setDoc } from 'firebase/firestore';

const Home = () => {
  const navigate = useNavigate();
  const [showJoin, setShowJoin] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const [showNamePopup, setShowNamePopup] = useState(false);
  const [pendingRoomId, setPendingRoomId] = useState('');

  const handleCreateRoom = async () => {
    const roomRef = await addDoc(collection(db, 'rooms'), {
      createdAt: Date.now()
    });
    setPendingRoomId(roomRef.id);
    setShowNamePopup(true);
  };

  const handleJoinRoom = () => {
    setShowJoin(true);
  };

  const handleJoinSubmit = async () => {
    if (!roomId) return alert('Enter a Room ID');
    const roomDoc = await getDoc(doc(db, 'rooms', roomId));
    if (roomDoc.exists()) {
      setPendingRoomId(roomId);
      setShowNamePopup(true);
    } else {
      alert('Room not found');
    }
  };

  const handleNameSubmit = async () => {
    if (!name) return alert('Enter your name');
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('isCreator', pendingRoomId === roomId ? 'false' : 'true');
    navigate(`/chat/${pendingRoomId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-yellow-100 flex flex-col items-center justify-center p-6">
      <div className="text-5xl">❤️</div>
      <h1 className="text-5xl font-bold text-gray-800 mt-4">Namakamu</h1>
      <p className="text-lg text-gray-600 mb-10">A secret space for two hearts.</p>

      <div className="space-y-4 w-full max-w-xs">
        <button onClick={handleCreateRoom} className="w-full bg-purple-200 text-white font-semibold text-lg py-3 rounded-full shadow-lg">
          Create Room
        </button>

        <button onClick={handleJoinRoom} className="w-full bg-purple-100 text-white font-semibold text-lg py-3 rounded-full shadow-lg">
          Join Room
        </button>

        {showJoin && (
          <div className="bg-white p-4 rounded-lg shadow mt-4">
            <input
              type="text"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
            <button
              onClick={handleJoinSubmit}
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded"
            >
              Continue
            </button>
          </div>
        )}

        <button className="w-full bg-yellow-200 text-gray-900 font-medium py-3 rounded-full shadow flex items-center justify-center gap-2">
          <span role="img" aria-label="lock">🔒</span> Shared memories
        </button>
      </div>

      {showNamePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Enter Your Name</h2>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              onClick={handleNameSubmit}
              className="w-full bg-pink-500 text-white font-semibold py-2 rounded"
            >
              Enter Chat Room
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
