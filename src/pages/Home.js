import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const generateRoomId = () => {
    const id = Math.random().toString(36).substr(2, 8);
    localStorage.setItem('creator', 'true');
    navigate(`/chat/${id}`);
  };

  const joinRoom = () => {
    if (!roomId.trim()) return;
    localStorage.setItem('creator', 'false');
    navigate(`/chat/${roomId.trim()}`);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1><span role="img" aria-label="heart">❤️</span> <strong>Namakamu</strong></h1>
      <p>A secret space for two hearts.</p>

      <button onClick={generateRoomId} style={{ marginTop: '10px' }}>Create Room</button>

      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>

      <div style={{ textAlign: 'left', marginTop: '40px', paddingLeft: '10%' }}>
        <h2><span role="img" aria-label="wrench">🛠</span> <strong>Features Coming Up</strong></h2>
        <ul>
          <li><span role="img" aria-label="chat">💬</span> Real-time two-way chat</li>
          <li><span role="img" aria-label="upload">🖼</span> Upload images</li>
          <li><span role="img" aria-label="lock">🔐</span> Private message view by code or user ID</li>
          <li><span role="img" aria-label="rainbow">🌈</span> Beautiful Tailwind UI</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
