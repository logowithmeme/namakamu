// src/pages/About.js
import React, { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase'; // ✅ Use exported db

const About = () => {
  const [message, setMessage] = useState('');

  const handleSend = async (e) => {
    e.preventDefault();
    if (message.trim() === '') return;

    const messagesRef = ref(db, 'messages');

    await push(messagesRef, {
      text: message,
      timestamp: new Date().toISOString(),
    });

    setMessage('');
    alert('Message sent to Namakamu!');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>About Namakamu</h1>
      <p>You can leave a message here:</p>

      <form onSubmit={handleSend} style={{ marginTop: '20px' }}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Type your message..."
          style={{ width: '100%', padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default About;
