import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';
import JoinRoomPage from './pages/JoinRoomPage';
import RoomCreated from './pages/RoomCreated';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat/:roomId" element={<ChatPage />} />
        <Route path="/join" element={<JoinRoomPage />} />
        <Route path="/room" element={<RoomCreated />} />
      </Routes>
    </Router>
  );
};

export default App;
