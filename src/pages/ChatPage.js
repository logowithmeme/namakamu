import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { ref, push, onChildAdded, set, get } from 'firebase/database';

const ChatPage = () => {
  const { roomId } = useParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Generate or retrieve local user ID
    let id = localStorage.getItem('userId');
    if (!id) {
      id = Math.random().toString(36).substring(2, 10);
      localStorage.setItem('userId', id);
    }
    setUserId(id);

    // Store this user under room participants
    const participantsRef = ref(db, `rooms/${roomId}/participants`);
    get(participantsRef).then((snapshot) => {
      const data = snapshot.val() || {};
      const existingIds = Object.values(data);
      if (!existingIds.includes(id) && existingIds.length < 2) {
        const newRef = push(participantsRef);
        set(newRef, id);
      }
    });

    // Fetch and listen to messages
    const messagesRef = ref(db, `rooms/${roomId}/messages`);
    onChildAdded(messagesRef, (snapshot) => {
      setMessages((prev) => [...prev, snapshot.val()]);
    });
  }, [roomId]);

  const sendMessage = () => {
    if (message.trim()) {
      const messagesRef = ref(db, `rooms/${roomId}/messages`);
      push(messagesRef, {
        text: message,
        senderId: userId,
        timestamp: Date.now(),
      });
      setMessage('');
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="min-h-screen p-4 bg-pink-50">
      <h2 className="text-2xl font-bold mb-2">💬 Chat Room: {roomId}</h2>

      <div className="mb-3">
        <span className="text-sm text-gray-500">
          Share this room ID with one person only. Private 1-to-1 room.
        </span>
      </div>

      <div className="bg-white p-4 rounded-md shadow-md max-w-xl mx-auto h-[60vh] overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, index) => {
          const isMe = msg.senderId === userId;
          const heart = isMe ? '💚' : '💙';
          const alignment = isMe ? 'text-right' : 'text-left';
          const bubbleStyle = isMe
            ? 'bg-green-100 text-black self-end rounded-br-none'
            : 'bg-blue-100 text-black self-start rounded-bl-none';

          return (
            <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-3 py-2 rounded-lg ${bubbleStyle}`}>
                <span className="text-sm">{msg.text} {heart}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex max-w-xl mx-auto">
        <input
          type="text"
          className="flex-1 border border-gray-400 rounded-l px-3 py-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-pink-500 text-white px-4 py-2 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
