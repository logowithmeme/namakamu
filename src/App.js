// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RoomCreated from './pages/RoomCreated';
import JoinRoomPage from './pages/JoinRoomPage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room-created/:roomId" element={<RoomCreated />} />
        <Route path="/join-room/:roomId" element={<JoinRoomPage />} />
        <Route path="/chat/:roomId" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
