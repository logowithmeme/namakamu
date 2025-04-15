// src/pages/GalleryPage.js
import React from 'react';

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sunset1 to-sunset2 p-8 text-center">
      <h1 className="text-3xl font-bold text-textAccent mb-4">Memories</h1>
      <p className="text-textAccent mb-6">A grid of special moments will appear here soon...</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-32 bg-white/40 rounded-xl shadow-md" />
        <div className="h-32 bg-white/40 rounded-xl shadow-md" />
        <div className="h-32 bg-white/40 rounded-xl shadow-md" />
        <div className="h-32 bg-white/40 rounded-xl shadow-md" />
      </div>
    </div>
  );
};

export default GalleryPage;
