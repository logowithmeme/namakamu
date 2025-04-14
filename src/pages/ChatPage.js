import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const ChatPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [angryMode, setAngryMode] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // 👇 Only prompt once when name not already set
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    } else {
      const name = prompt("Enter your name:");
      if (!name) return navigate("/");
      setUserName(name);
      localStorage.setItem("userName", name);
    }
  }, [navigate]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "rooms", roomId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setMessages(data.messages || []);
      }
    });

    return () => unsubscribe();
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    const messageData = {
      text: newMessage,
      sender: userName,
      timestamp: new Date().toISOString(),
    };

    const roomRef = doc(db, "rooms", roomId);
    await updateDoc(roomRef, {
      messages: arrayUnion(messageData),
    });

    setNewMessage("");
  };

  return (
    <div
      className={`min-h-screen p-4 flex flex-col justify-between bg-gradient-to-b from-pink-100 to-purple-100 ${
        angryMode ? "bg-red-200" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-semibold text-pink-700">
          💖 Namakamu Chat Room
        </h2>
        <label className="flex items-center gap-2 text-red-600">
          <span role="img" aria-label="angry">
            😡
          </span>
          Angry Mode
          <input
            type="checkbox"
            checked={angryMode}
            onChange={() => setAngryMode((prev) => !prev)}
          />
        </label>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl max-w-xs ${
              msg.sender === userName
                ? "bg-pink-200 ml-auto text-right rounded-br-none"
                : "bg-white mr-auto text-left rounded-bl-none"
            } shadow-md`}
          >
            <strong className="block text-sm text-gray-600">
              {msg.sender}
            </strong>
            <span className="text-gray-800">{msg.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 p-3 rounded-full border border-gray-300 focus:outline-none"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-pink-500 text-white px-5 py-3 rounded-full hover:bg-pink-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
