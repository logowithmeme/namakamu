// src/pages/Home.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  const createRoom = async () => {
    setCreating(true);
    const id = uuidv4().slice(0, 8);
    await setDoc(doc(db, "rooms", id), {
      createdAt: Date.now()
    });
    localStorage.setItem(`creator-${id}`, "true");
    setCreating(false);
    navigate(`/chat/${id}`);
  };

  const joinRoom = () => {
    if (roomId.trim()) {
      navigate(`/chat/${roomId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100 p-4">
      <h1 className="text-4xl font-bold mb-4 text-pink-600">💖 Namakamu</h1>

      <button
        onClick={createRoom}
        className="bg-pink-500 text-white px-6 py-2 rounded-full shadow-md mb-4 hover:bg-pink-600 transition disabled:opacity-50"
        disabled={creating}
      >
        {creating ? "Creating Room..." : "➕ Create Room"}
      </button>

      <div className="mb-4">
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
          className="px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none"
        />
        <button
          onClick={joinRoom}
          className="bg-purple-500 text-white px-4 py-2 rounded-r-full hover:bg-purple-600 transition"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
