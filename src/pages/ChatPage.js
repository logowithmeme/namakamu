import React, { useState, useEffect, useRef } from 'react';
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
  const [username, setUsername] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    const creator = localStorage.getItem(`creator-${roomId}`);
    const joiner = localStorage.getItem(`joiner-name-${roomId}`);

    if (creator) {
      setCreatorId(creator);
      setUsername(creator);
    } else if (joiner) {
      setCreatorId('joiner');
      setUsername(joiner);
    }

    const q = query(collection(db, 'rooms', roomId, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, [roomId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (message.trim() === '') return;

    if (!creatorId || !username) {
      alert("Something went wrong. Please refresh and try again.");
      return;
    }

    try {
      await addDoc(collection(db, 'rooms', roomId, 'messages'), {
        text: message,
        timestamp: serverTimestamp(),
        sender: creatorId,
        name: username,
      });
      setMessage('');
    } catch (err) {
      console.error("Send error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100 px-4 py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-pink-200 text-center py-4 text-2xl font-semibold text-pink-900">
          Chat Room: {roomId}
        </div>

        <div className="px-4 py-6 h-[60vh] overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === creatorId ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[70%] text-black text-base shadow-md
                whitespace-pre-wrap break-words ${
                  msg.sender === creatorId
                    ? 'bg-green-100 rounded-br-none'
                    : 'bg-blue-100 rounded-bl-none'
                }`}
              >
                <span className="font-semibold">{msg.name}:</span> {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
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
            className="bg-[#FF4F81] hover:bg-[#ff2f6e] text-white px-4 py-2 rounded-full shadow-md transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
