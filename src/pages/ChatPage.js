// 💬 ChatPage.js with Name, Mood Toggle, and Clean Bubbles
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
  const [username, setUsername] = useState('');
  const [isAngry, setIsAngry] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem(`name-${roomId}`);
    if (!storedName) {
      const name = prompt('Enter your name to join the chat room:');
      if (name) {
        localStorage.setItem(`name-${roomId}`, name);
        setUsername(name);
      }
    } else {
      setUsername(storedName);
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
      sender: username,
    });
    setMessage('');
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 px-4 py-6 ${
        isAngry
          ? 'bg-red-100' // Angry theme
          : 'bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100'
      }`}
    >
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="flex justify-between items-center px-4 py-3 bg-pink-200 text-pink-900 text-lg font-bold">
          <div>💗 Namakamu Chat Room</div>
          <label className="flex items-center gap-1 cursor-pointer">
            <span role="img" aria-label="angry">😡</span>
            <input
              type="checkbox"
              className="toggle-checkbox"
              checked={isAngry}
              onChange={() => setIsAngry(!isAngry)}
            />
          </label>
        </div>

        <div className="px-4 py-6 h-[60vh] overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === username ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[70%] text-white text-base shadow-md whitespace-pre-wrap break-words ${
                  msg.sender === username
                    ? 'bg-green-500 rounded-br-none'
                    : 'bg-blue-500 rounded-bl-none'
                }`}
              >
                <strong>{msg.sender}:</strong> {msg.text}
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