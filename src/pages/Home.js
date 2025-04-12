import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const id = uuidv4().split('-')[0];
    navigate(`/chat/${id}?creator=true`);
  };

  const handleJoinRoom = () => {
    if (roomId.trim() !== '') {
      navigate(`/chat/${roomId}`);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>❤️ Namakamu</h1>
      <p>A secret space for two hearts.</p>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleCreateRoom}>Create Room</button>
        <br /><br />
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter Room ID"
        />
        <button onClick={handleJoinRoom}>Join Room</button>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>🔧 Features Coming Up</h3>
        <ul>
          <li>💬 Real-time two-way chat</li>
          <li>🖼 Upload images</li>
          <li>🔐 Private message view by code or user ID</li>
          <li>🌈 Beautiful Tailwind UI</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
