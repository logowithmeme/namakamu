// 💖 Tailwind-style Premium Chat UI with Name Prompt & Mood Toggle
import React, { useState, useEffect } from 'react';
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
  const [name, setName] = useState('');
  const [creatorId, setCreatorId] = useState('');
  const [mood, setMood] = useState(false); // Angry mode

  useEffect(() => {
    const existing = localStorage.getItem(`creator-${roomId}`);
    const username = localStorage.getItem(`username-${roomId}`);
    if (!username) {
      const userNamePrompt = prompt('Enter your name:');
      localStorage.setItem(`username-${roomId}`, userNamePrompt);
      setName(userNamePrompt);
    } else {
      setName(username);
    }
    if (!existing) {
      localStorage.setItem(`creator-${roomId}`, Date.now().toString());
      setCreatorId(localStorage.getItem(`creator-${roomId}`));
    } else {
      setCreatorId(existing);
    }

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
      name: name,
    });
    setMessage('');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${mood ? 'bg-red-200' : 'bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100'} py-10 px-4`}>
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-pink-200 text-center py-4 text-2xl font-semibold text-pink-900">
          💗 Namakamu Chat Room
        </div>
        <div className="flex justify-end pr-4 pt-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-red-500">
            😡 Angry Mode
            <input type="checkbox" checked={mood} onChange={() => setMood(!mood)} />
          </label>
        </div>
        <div className="px-4 py-6 h-[60vh] overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === creatorId ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[70%] text-white text-base shadow-md whitespace-pre-wrap break-words ${
                  msg.sender === creatorId
                    ? 'bg-green-400 rounded-br-none'
                    : 'bg-blue-400 rounded-bl-none'
                }`}
              >
                <span className="block font-semibold text-sm text-white">
                  {msg.name || 'Anonymous'}:
                </span>
                {msg.text}
              </div>
            </div>
          ))}
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
