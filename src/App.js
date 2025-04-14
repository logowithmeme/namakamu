// App.js (Final routing with all pages)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RoomCreated from './pages/RoomCreated';
import ChatPage from './pages/ChatPage';
import JoinRoomPage from './pages/JoinRoomPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room-created" element={<RoomCreated />} />
        <Route path="/chat/:roomId" element={<ChatPage />} />
        <Route path="/join-room/:roomId" element={<JoinRoomPage />} />
      </Routes>
    </Router>
  );
}

export default App;
