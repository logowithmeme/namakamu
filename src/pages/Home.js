import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [joiningId, setJoiningId] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const createRoom = async () => {
    setLoading(true);
    const newRoomId = uuidv4().slice(0, 8);
    await setDoc(doc(db, 'rooms', newRoomId), {
      createdAt: Date.now(),
    });
    localStorage.setItem(`creator-${newRoomId}`, 'true');
    setRoomId(newRoomId);
    setLoading(false);
  };

  const joinRoom = () => {
    if (!joiningId.trim()) return;
    navigate(`/chat/${joiningId.trim()}`);
  };

  const enterRoom = () => {
    if (!roomId) return;
    navigate(`/chat/${roomId}`);
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md space-y-4 text-center">
        <h1 className="text-3xl font-bold text-pink-600 flex justify-center items-center gap-2">
          <span>💖</span> Namakamu
        </h1>
        <p className="text-gray-600 mb-4">A secret space for two hearts.</p>

        <button
          onClick={createRoom}
          disabled={loading}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-full w-full transition"
        >
          {loading ? 'Creating Room...' : '➕ Create Room'}
        </button>

        {roomId && (
          <div className="bg-pink-100 rounded-lg p-4 shadow text-sm text-gray-700 space-y-2">
            <div><strong>Room ID:</strong> {roomId}</div>
            <div className="flex justify-center gap-2">
              <button
                onClick={copyRoomId}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-full text-sm"
              >
                {copied ? 'Copied!' : '📋 Copy'}
              </button>
              <button
                onClick={enterRoom}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full text-sm"
              >
                🔓 Enter Room
              </button>
            </div>
          </div>
        )}

        <div className="border-t pt-4">
          <input
            type="text"
            placeholder="Enter Room ID"
            value={joiningId}
            onChange={(e) => setJoiningId(e.target.value)}
            className="border px-4 py-2 w-full rounded-full text-center focus:outline-none focus:ring focus:ring-pink-300"
          />
          <button
            onClick={joinRoom}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 mt-2 rounded-full w-full"
          >
            🔑 Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
