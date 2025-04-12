// src/pages/Home.js
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Home() {
  const navigate = useNavigate();

  const createRoom = () => {
    const roomId = uuidv4().slice(0, 8);
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-100 to-purple-200 text-center">
      <h1 className="text-4xl font-bold mb-4 text-purple-800">❤️ Namakamu</h1>
      <p className="text-lg mb-6 text-gray-700">A secret space for two hearts.</p>
      <button
        onClick={createRoom}
        className="bg-rose-400 text-white px-6 py-3 rounded-full hover:bg-rose-500"
      >
        Create a private link
      </button>
    </div>
  );
}

export default Home;
