import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const JoinRoomPage = () => {
  const [roomId, setRoomId] = useState('');
  const [name, setName] = useState('');
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const verifyRoom = async () => {
    if (roomId.trim() === '') return;
    const roomRef = doc(db, 'chatrooms', roomId);
    const roomSnap = await getDoc(roomRef);
    if (roomSnap.exists()) {
      setStep(2);
    } else {
      alert('Room Not Found!');
    }
  };

  const handleJoin = () => {
    if (name.trim() === '') return;
    localStorage.setItem(`joiner-name-${roomId}`, name);
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-sm w-full space-y-4 text-center">
        <h1 className="text-2xl font-bold text-purple-700 mb-2">Join a Chat Room</h1>

        {step === 1 && (
          <>
            <input
              type="text"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-full text-center focus:outline-none"
            />
            <button
              onClick={verifyRoom}
              className="bg-orange-400 text-white py-2 px-6 rounded-full shadow hover:bg-orange-500 transition"
            >
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-full text-center focus:outline-none"
            />
            <button
              onClick={handleJoin}
              className="bg-pink-400 text-white py-2 px-6 rounded-full shadow hover:bg-pink-500 transition"
            >
              Enter Room
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default JoinRoomPage;
