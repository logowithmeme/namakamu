import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoomPage from './pages/RoomPage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoomPage />} />
        <Route path="/chat/:roomId" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;
