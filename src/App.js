// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import RoomCreated from './pages/RoomCreated';
import JoinRoomPage from './pages/JoinRoomPage';
import ChatPage from './pages/ChatPage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room-created" element={<RoomCreated />} />
        <Route path="/join-room/:roomId" element={<JoinRoomPage />} />
        <Route path="/chat/:roomId" element={<ChatPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
