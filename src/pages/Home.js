//  Home.js - Create or Join Room 
import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { db } from '../firebase'; 
import { doc, setDoc, getDoc } from 'firebase/firestore'; 
 
const Home = () => { 
  const navigate = useNavigate(); 
  const [joinCode, setJoinCode] = useState(''); 
  const [roomId, setRoomId] = useState(null); 
 
  const generateRoom = async () => { 
    const newRoomId = Math.random().toString(36).substring(2, 10); 
    await setDoc(doc(db, 'rooms', newRoomId), { createdAt: Date.now() }); 
    localStorage.setItem(`creator-${newRoomId}`, Date.now().toString()); 
    setRoomId(newRoomId); 
  }; 
 
  const enterRoom = () => { 
    if (!roomId) return; 
    navigate(`/chat/${roomId}`); 
  }; 
 
  const joinRoom = async () => { 
    const ref = doc(db, 'rooms', joinCode); 
    const snap = await getDoc(ref); 
    if (snap.exists()) { 
      navigate(`/chat/${joinCode}`); 
    } else { 
      alert('Room not found'); 
    } 
  }; 
 
  return ( 
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from
pink-100 via-purple-100 to-orange-100 p-4"> 
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"> 
        <h1 className="text-2xl font-bold text-center mb-4"> Namakamu</h1> 
        <button 
          onClick={generateRoom} 
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 
rounded-full mb-3" 
        > 
          Create Room 
        </button> 
        {roomId && ( 
          <div className="text-center text-sm text-gray-600 mb-2"> 
            Room ID: <span className="font-mono font-bold">{roomId}</span> 
            <button 
              onClick={() => navigator.clipboard.writeText(roomId)} 
              className="ml-2 text-blue-500 underline text-xs" 
            > 
              Copy 
            </button> 
          </div> 
        )} 
        <button 
          onClick={enterRoom} 
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 
rounded-full mb-3" 
        > 
          Enter Room 
        </button> 
        <input 
          className="w-full border border-gray-300 p-2 rounded-full mb-2" 
          placeholder="Enter Room ID to Join" 
          value={joinCode} 
          onChange={(e) => setJoinCode(e.target.value)} 
        /> 
        <button 
          onClick={joinRoom} 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 
rounded-full" 
        > 
          Join Room 
        </button> 
      </div> 
    </div> 
  ); 
}; 
 
export default Home;