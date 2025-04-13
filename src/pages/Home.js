import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Home() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const newRoomId = uuidv4().slice(0, 8);
    navigate(`/chat/${newRoomId}`);
  };

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      navigate(`/chat/${roomId}`);
    }
  };

  return (
    <div className="text-center mt-12">
      <h1 className="text-4xl font-bold mb-6">💖 Namakamu</h1>
      <div className="mb-4">
        <button onClick={handleCreateRoom}>Create Room</button>
      </div>
      <input
        type="text"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
}

export default Home;
