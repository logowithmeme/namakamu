// src/pages/ChatPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';

const ChatPage = () => {
  const { roomId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [creatorId, setCreatorId] = useState('');

  useEffect(() => {
    let creator = localStorage.getItem(`creator-${roomId}`);
    if (!creator) {
      creator = Date.now().toString();
      localStorage.setItem(`creator-${roomId}`, creator);
    }
    setCreatorId(creator);

    const q = query(collection(db, 'rooms', roomId, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, [roomId]);

  const sendMessage = async () => {
    if (message.trim() === '') return;

    await addDoc(collection(db, 'rooms', roomId, 'messages'), {
      text: message,
      timestamp: serverTimestamp(),
      sender: creatorId,
    });

    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100 py-6 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="bg-gradient-to-r from-pink-400 to-pink-600 text-white text-xl text-center font-bold py-4">
          💬 Namakamu Room: <span className="font-mono">{roomId}</span>
        </div>

        <div className="h-[60vh] overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => {
            const isCreator = msg.sender === creatorId;
            return (
              <div
                key={index}
                className={`flex ${isCreator ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl text-white text-sm shadow-md ${
                    isCreator
                      ? 'bg-green-400 rounded-br-none'
                      : 'bg-blue-400 rounded-bl-none'
                  }`}
                >
                  {isCreator ? '💚 ' : '💙 '}
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t flex gap-2 bg-gray-50">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="bg-pink-500 text-white px-5 py-2 rounded-full hover:bg-pink-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
