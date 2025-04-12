// src/pages/ChatPage.js
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, push, onValue, get, set } from 'firebase/database';
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

const ChatPage = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isCreator, setIsCreator] = useState(false);
  const [roomValid, setRoomValid] = useState(true);
  const messagesEndRef = useRef(null);

  const userId = useRef(localStorage.getItem(`user_${roomId}`));

  useEffect(() => {
    if (!userId.current) {
      userId.current = uuidv4();
      localStorage.setItem(`user_${roomId}`, userId.current);
    }
  }, [roomId]);

  useEffect(() => {
    const roomRef = ref(db, `rooms/${roomId}`);

    get(roomRef).then(snapshot => {
      const roomData = snapshot.val();
      if (!roomData) {
        setRoomValid(false);
        return;
      }

      const createdAt = roomData.createdAt;
      const now = Date.now();
      if (now - createdAt > 24 * 60 * 60 * 1000) {
        setRoomValid(false);
      } else {
        setRoomValid(true);
        if (!roomData.creatorId) {
          set(roomRef, {
            ...roomData,
            creatorId: userId.current,
            createdAt: Date.now(),
          });
          setIsCreator(true);
        } else if (roomData.creatorId === userId.current) {
          setIsCreator(true);
        }
      }
    });

    const messagesRef = ref(db, `rooms/${roomId}/messages`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedMessages = data ? Object.values(data) : [];
      setMessages(loadedMessages);
    });
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const messagesRef = ref(db, `rooms/${roomId}/messages`);
    await push(messagesRef, {
      id: uuidv4(),
      text: newMessage,
      sender: userId.current,
      timestamp: new Date().toISOString(),
    });
    setNewMessage('');
  };

  if (!roomValid) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">⛔ Room Not Found or Expired</h1>
        <p className="mt-4">Please create a new room or check the room ID.</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Chat Room: {roomId}</h1>
      <div className="space-y-2 max-h-[60vh] overflow-y-auto border p-4 rounded-lg">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-3 rounded-lg w-fit max-w-[80%] ${
              msg.sender === userId.current ? 'bg-green-200 ml-auto text-right' : 'bg-blue-100 text-left'
            }`}
          >
            <span>{msg.text}</span>{' '}
            {msg.sender === userId.current ? '💚' : isCreator ? '💙' : ''}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSend} className="mt-4 flex">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-l"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 rounded-r"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;