// src/pages/Gallery.js
import React from 'react';

const Gallery = () => {
  const memories = [
    { type: 'text', content: 'You said you’ll wait for me 💬', time: '2 days ago' },
    { type: 'photo', content: '📸 Beach selfie', time: '1 week ago' },
    { type: 'sticker', content: '💖 Love sticker', time: 'Just now' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sunset1 to-sunset2 p-6 text-textAccent">
      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6">📸 Shared Memories</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {memories.map((m, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-all"
            >
              <p className="text-lg mb-2">{m.content}</p>
              <span className="text-sm text-gray-500">{m.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
