// src/pages/Home.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");

  const handleGenerateRoom = () => {
    const newRoomId = uuidv4().slice(0, 8);
    navigate(`/chat/${newRoomId}`);
  };

  const handleJoinRoom = () => {
    if (roomId.trim() !== "") {
      navigate(`/chat/${roomId}`);
    } else {
      alert("Please enter a valid Room ID.");
    }
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">💬 Welcome to Namakamu Chat</h1>

      <button
        onClick={handleGenerateRoom}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        Generate Room
      </button>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="border px-3 py-2 mr-2 rounded"
        />
        <button
          onClick={handleJoinRoom}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Join Room
        </button>
      </div>
    </div>
  );
};

export default Home;
