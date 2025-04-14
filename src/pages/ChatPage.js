// ChatPage.js
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

const ChatPage = () => {
  const { roomId } = useParams();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showNameInput, setShowNameInput] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!showNameInput) {
      const q = query(collection(db, 'chatrooms', roomId, 'messages'), orderBy('timestamp'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setMessages(snapshot.docs.map(doc => doc.data()));
        scrollToBottom();
      });
      return () => unsubscribe();
    }
  }, [showNameInput]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    await addDoc(collection(db, 'chatrooms', roomId, 'messages'), {
      name,
      text: message,
      timestamp: serverTimestamp(),
    });
    setMessage('');
  };

  const handleEnterChat = async () => {
    if (!name.trim()) return;
    const roomRef = doc(db, 'chatrooms', roomId);
    const roomSnap = await getDoc(roomRef);

    if (roomSnap.exists()) {
      const roomData = roomSnap.data();
      if (!roomData.creator) {
        await updateDoc(roomRef, { creator: name });
      } else if (!roomData.joiner && name !== roomData.creator) {
        await updateDoc(roomRef, { joiner: name });
      } else if (name !== roomData.creator && name !== roomData.joiner) {
        alert('Room full or name conflict');
        return;
      }
      setShowNameInput(false);
    } else {
      alert('Room does not exist');
    }
  };

  if (showNameInput) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 p-4">
        <div className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-purple-800 mb-4">Enter Your Name</h1>
          <input
            type="text"
            placeholder="e.g., CG or Sravani"
            className="w-full p-3 border border-purple-300 rounded-lg mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={handleEnterChat}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full"
          >
            Enter Chat Room
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 flex flex-col">
      <div className="bg-purple-300 text-center py-3 text-lg font-bold text-white">
        Room ID: {roomId}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.name === name ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] text-white text-sm shadow-md whitespace-pre-wrap break-words
                ${msg.name === name ? 'bg-green-500 rounded-br-none' : 'bg-blue-500 rounded-bl-none'}`}
            >
              <div className="font-semibold text-xs mb-1">{msg.name}</div>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="p-3 border-t flex items-center gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;