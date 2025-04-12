// src/pages/ChatPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getDatabase,
  ref,
  push,
  onValue,
} from 'firebase/database';
import { app } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

const db = getDatabase(app);

const ChatPage = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    let localId = localStorage.getItem('userId');
    if (!localId) {
      localId = uuidv4();
      localStorage.setItem('userId', localId);
    }
    setUserId(localId);
  }, []);

  useEffect(() => {
    const messagesRef = ref(db, `rooms/${roomId}/messages`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val() || {};
      const loadedMessages = Object.entries(data).map(([id, val]) => ({
        id,
        ...val,
      }));
      setMessages(loadedMessages);
    });
    return () => unsubscribe();
  }, [roomId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (text.trim() === '') return;

    const messagesRef = ref(db, `rooms/${roomId}/messages`);
    await push(messagesRef, {
      userId,
      text,
      timestamp: new Date().toISOString(),
    });

    setText('');
  };

  const isCreator = messages.length > 0 && messages[0]?.userId === userId;

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      <h2 className="text-xl font-bold text-center mb-4">
        Chat Room: <span className="text-blue-500">{roomId}</span>
      </h2>

      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg) => {
          const isOwn = msg.userId === userId;
          const bubbleColor = isOwn ? 'bg-green-200' : 'bg-blue-200';
          const align = isOwn ? 'self-end' : 'self-start';
          const heart = isOwn ? '💚' : '💙';

          return (
            <div
              key={msg.id}
              className={`max-w-xs px-4 py-2 rounded-lg ${bubbleColor} ${align}`}
            >
              <span className="text-sm">{msg.text}</span>
              <div className="text-xs text-right mt-1">{heart}</div>
            </div>
          );
        })}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 border rounded"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
