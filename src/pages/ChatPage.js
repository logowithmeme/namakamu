import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onChildAdded, push } from 'firebase/database';
import { app } from '../firebase';

const ChatPage = () => {
  const { roomId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const db = getDatabase(app);
    const messagesRef = ref(db, `chatrooms/${roomId}`);

    onChildAdded(messagesRef, (snapshot) => {
      const msg = snapshot.val();
      setMessages((prev) => [...prev, msg]);
    });
  }, [roomId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    const db = getDatabase(app);
    const messagesRef = ref(db, `chatrooms/${roomId}`);

    await push(messagesRef, {
      text: message,
      timestamp: new Date().toISOString(),
    });

    setMessage('');
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-4">
      <div className="w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-2">Chat Room: <span className="text-blue-600">{roomId}</span></h2>
        <p className="text-sm text-gray-600 mb-4">
          Share this link: 
          <span
            className="text-blue-500 underline cursor-pointer select-all ml-1"
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            title="Click to copy"
          >
            {window.location.href}
          </span>
        </p>

        <div className="bg-gray-100 h-[400px] overflow-y-auto p-4 rounded mb-4 shadow-inner">
          {messages.map((msg, idx) => (
            <div key={idx} className="mb-2">
              <div className="bg-white p-2 rounded shadow-sm text-sm">{msg.text}</div>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border p-2 rounded"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
