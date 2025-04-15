// src/pages/AboutPage.js
import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sunset1 to-sunset2 text-textAccent font-playfair">
      <div className="text-center max-w-xl p-6 bg-white/80 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4">About Namakamu</h1>
        <p className="text-md">
          Built with ❤️ to create honest and deep conversations between two hearts.
          In this era of situationships and flings, let’s bring back soulful connections.
          Talk. Think. Then love wisely. – JK
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
