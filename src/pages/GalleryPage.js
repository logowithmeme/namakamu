// src/pages/GalleryPage.js
import React from 'react';

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sunset1 to-sunset2 p-6 text-center">
      <h1 className="text-3xl font-bold text-textAccent mb-6">Memory Gallery</h1>
      <p className="text-textAccent mb-10">
        Here’s a placeholder memory wall. One day, all your shared moments will live here 💫
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-white/40 backdrop-blur-md rounded-xl shadow-inner flex items-center justify-center text-textAccent font-semibold"
          >
            📸 Memory {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
