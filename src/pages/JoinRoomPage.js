import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const RoomPage = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');

  const handleCreateRoom = async () => {
    try {
      const docRef = await addDoc(collection(db, 'rooms'), {
        createdAt: new Date(),
      });
      setRoomId(docRef.id);
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const handleCopyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    alert('Room ID copied to clipboard!');
  };

  const handleEnterRoom = () => {
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="container">
      {!roomId ? (
        <button onClick={handleCreateRoom}>Create Room</button>
      ) : (
        <div>
          <p>Room ID: {roomId}</p>
          <button onClick={handleCopyRoomId}>Copy Room ID</button>
          <button onClick={handleEnterRoom}>Enter Chat Room</button>
        </div>
      )}
    </div>
  );
};

export default RoomPage;
