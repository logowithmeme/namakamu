// src/pages/ChatPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

const ChatPage = () => {
  const { roomId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [creatorId, setCreatorId] = useState('');

  useEffect(() => {
    const creator = localStorage.getItem(`creator-${roomId}`);
    if (!creator) {
      const newId = Date.now().toString();
      localStorage.setItem(`creator-${roomId}`, newId);
      setCreatorId(newId);
    } else {
      setCreatorId(creator);
    }

    const q = query(
      collection(db, 'rooms', roomId, 'messages'),
      orderBy('timestamp')
    );

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
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100 p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden">
        <div className="bg-pink-300 text-white font-semibold text-xl text-center py-4">
          💬 Namakamu Private Chat
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {messages.map((msg, index) => {
            const isCreator = msg.sender === creatorId;
            return (
              <div
                key={index}
                className={`flex ${isCreator ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-4 py-2 text-white rounded-xl max-w-[70%] whitespace-pre-wrap break-words shadow-md text-sm ${
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

        <div className="border-t p-4 flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <button
            onClick={sendMessage}
            className="bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded-full"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
