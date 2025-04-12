import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import {
  ref,
  onChildAdded,
  push,
  set,
  get,
  child
} from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';

const ChatPage = () => {
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userId] = useState(() => uuidv4());
  const [creatorId, setCreatorId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const roomRef = ref(db, `rooms/${roomId}`);

    get(child(ref(db), `rooms/${roomId}/creatorId`)).then(snapshot => {
      if (snapshot.exists()) {
        setCreatorId(snapshot.val());
      } else {
        const newCreatorId = userId;
        setCreatorId(newCreatorId);
        set(ref(db, `rooms/${roomId}`), { creatorId: newCreatorId });
      }
    });

    const messagesRef = ref(db, `rooms/${roomId}/messages`);
    onChildAdded(messagesRef, (snapshot) => {
      setMessages((prev) => [...prev, snapshot.val()]);
    });
  }, [roomId, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const messageRef = ref(db, `rooms/${roomId}/messages`);
    await push(messageRef, {
      text: input,
      userId,
      timestamp: new Date().toISOString(),
    });
    setInput('');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Chat Room: {roomId}</h2>
      <div className="border rounded-lg p-4 h-96 overflow-y-scroll bg-white shadow">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${msg.userId === userId ? 'bg-green-100 text-right' : 'bg-blue-100 text-left'}`}
          >
            <span>{msg.text}</span>
            {msg.userId === creatorId ? (
              <span style={{ marginLeft: '10px' }}>💚</span>
            ) : (
              <span style={{ marginLeft: '10px' }}>💙</span>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow border rounded px-3 py-2"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;