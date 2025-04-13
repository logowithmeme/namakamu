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
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [creatorId, setCreatorId] = useState('');
  const scrollRef = useRef();

  useEffect(() => {
    let creator = localStorage.getItem(`creator-${roomId}`);
    if (!creator) {
      creator = Date.now().toString();
      localStorage.setItem(`creator-${roomId}`, creator);
    }
    setCreatorId(creator);

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
    });
    setMessage('');
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-orange-100 py-6 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-[85vh]">
        <div className="bg-pink-200 text-pink-900 text-xl font-semibold py-4 text-center">
          💗 Namakamu Chat Room
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, idx) => {
            const isCreator = msg.sender === creatorId;
            const align = isCreator ? 'justify-end' : 'justify-start';
            const bubbleColor = isCreator ? 'bg-green-400' : 'bg-blue-400';
            const heart = isCreator ? '💚' : '💙';

            return (
              <div key={idx} className={`flex ${align}`}>
                <div
                  className={`${bubbleColor} text-white px-4 py-2 rounded-2xl max-w-[70%] text-sm whitespace-pre-wrap break-words shadow-md ${
                    isCreator ? 'rounded-br-none' : 'rounded-bl-none'
                  }`}
                >
                  <span className="mr-1">{heart}</span>
                  {msg.text}
                </div>
              </div>
            );
          })}
          <div ref={scrollRef}></div>
        </div>

        <div className="p-4 border-t flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-300"
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
