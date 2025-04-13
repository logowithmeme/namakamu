import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function Home() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const createRoom = () => {
    const newRoom = uuidv4().slice(0, 8);
    navigate(`/chat/${newRoom}`);
  };

  const joinRoom = () => {
    if (roomId.trim()) {
      navigate(`/chat/${roomId}`);
    }
  };

  return (
    <div className="text-center p-8">
      <h1 className="text-5xl font-bold">💖 Namakamu</h1>
      <p className="text-lg mt-2 mb-8">A secret space for two hearts.</p>
      <button onClick={createRoom}>Create Room</button>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
    </div>
  );
}

export default Home;
