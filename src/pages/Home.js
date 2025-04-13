// src/pages/Home.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");

  const handleCreateRoom = async () => {
    const newRoomId = uuidv4().slice(0, 8);
    await set(ref(db, `rooms/${newRoomId}`), {
      createdAt: Date.now(),
      users: 1,
    });
    navigate(`/chat/${newRoomId}?creator=true`);
  };

  const handleJoinRoom = async () => {
    if (!roomId.trim()) return alert("Please enter a Room ID");
    const snapshot = await get(child(ref(db), `rooms/${roomId}`));
    if (snapshot.exists()) {
      navigate(`/chat/${roomId}?creator=false`);
    } else {
      alert("Room not found!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-blue-100 p-4 text-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">💖 Namakamu</h1>
      <div className="space-y-6">
        <button
          onClick={handleCreateRoom}
          className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg text-lg"
        >
          Create Room
        </button>
        <div>
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="px-4 py-2 border rounded-full mr-2 text-center"
          />
          <button
            onClick={handleJoinRoom}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
