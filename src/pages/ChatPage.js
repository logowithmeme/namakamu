import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase';

const ChatPage = () => {
  const { roomId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [creatorId, setCreatorId] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    let stored = localStorage.getItem(`creator-${roomId}`);
    if (!stored) {
      localStorage.setItem(`creator-${roomId}`, Date.now().toString());
      stored = localStorage.getItem(`creator-${roomId}`);
    }
    setCreatorId(stored);

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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-pink-200 text-center py-4 text-2xl font-bold text-pink-900">
          💬 Namakamu Chat Room
        </div>

        <div className="h-[60vh] overflow-y-auto px-4 py-6 space-y-3">
          {messages.map((msg, idx) => {
            const isCreator = msg.sender === creatorId;
            return (
              <div key={idx} className={`flex ${isCreator ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`rounded-2xl px-4 py-2 text-white shadow-md max-w-[70%] text-base break-words whitespace-pre-wrap ${
                    isCreator
                      ? 'bg-green-400 rounded-br-none'
                      : 'bg-blue-400 rounded-bl-none'
                  }`}
                >
                  {isCreator ? '💚' : '💙'} {msg.text}
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        <div className="flex items-center gap-2 border-t p-4">
          <input
            type="text"
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
