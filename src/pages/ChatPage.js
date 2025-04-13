// src/pages/ChatPage.js
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
} from 'firebase/firestore';

const ChatPage = () => {
  const { roomId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [creatorId, setCreatorId] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    const localCreatorId = localStorage.getItem(`creator-${roomId}`);
    const currentId = localCreatorId || Date.now().toString();

    if (!localCreatorId) {
      localStorage.setItem(`creator-${roomId}`, currentId);
    }

    setCreatorId(currentId);

    const q = query(collection(db, 'rooms', roomId, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });

    return () => unsubscribe();
  }, [roomId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (message.trim() === '') return;

    await addDoc(collection(db, 'rooms', roomId, 'messages'), {
      text: message,
      sender: creatorId,
      timestamp: serverTimestamp(),
    });

    setMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-pink-200 text-center py-4 text-2xl font-semibold text-pink-900">
          💗 Namakamu Chat Room
        </div>

        <div className="px-4 py-6 h-[60vh] overflow-y-auto space-y-4">
          {messages.map((msg, index) => {
            const isCreator = msg.sender === creatorId;
            const align = isCreator ? 'justify-end' : 'justify-start';
            const bgColor = isCreator ? 'bg-green-400' : 'bg-blue-400';
            const rounded = isCreator ? 'rounded-br-none' : 'rounded-bl-none';
            const heart = isCreator ? '💚' : '💙';

            return (
              <div key={index} className={`flex ${align}`}>
                <div
                  className={`px-4 py-2 max-w-[70%] text-white text-base shadow-md whitespace-pre-wrap break-words rounded-2xl ${bgColor} ${rounded}`}
                >
                  {heart} {msg.text}
                </div>
              </div>
            );
          })}
          <div ref={scrollRef}></div>
        </div>

        <div className="p-4 border-t flex items-center gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded-full transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
