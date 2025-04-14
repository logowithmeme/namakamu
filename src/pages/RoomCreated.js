// src/pages/roomcreated.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

function RoomCreated() {
  const [roomId, setRoomId] = useState("");
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    const newRoomId = uuidv4().slice(0, 8);
    try {
      await addDoc(collection(db, "rooms"), {
        roomId: newRoomId,
        createdAt: serverTimestamp(),
        messages: [],
      });
      setRoomId(newRoomId);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNext = () => {
    navigate(`/chat/${roomId}?creator=true`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-pink-300">
      <h1 className="text-3xl font-bold mb-8">💗 Create a Love Room</h1>
      {!roomId ? (
        <button
          onClick={handleCreateRoom}
          className="bg-pink-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-pink-700"
        >
          Create Room
        </button>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg">Room ID: <strong>{roomId}</strong></p>
          <button
            onClick={handleCopy}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={handleNext}
            className="bg-green-600 text-white px-5 py-2 rounded-xl shadow hover:bg-green-700"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default RoomCreated;
