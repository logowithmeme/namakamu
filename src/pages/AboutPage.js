import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sunset1 to-sunset2 text-center px-6">
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl max-w-2xl text-textAccent font-playfair">
        <h1 className="text-3xl font-bold mb-4">About Namakamu</h1>
        <p className="mb-4">
          In today’s age of <strong>flirtationships</strong>, <strong>situationships</strong>, and casual entanglements,
          Namakamu offers a rare space to connect with depth — not identity.
        </p>
        <p className="mb-4">
          Before taking the biggest step in your love life, pause, reflect, and chat
          privately with someone who feels like "the one" — anonymously.
        </p>
        <p className="mt-6 font-bold">— JK</p>
      </div>
    </div>
  );
};

export default AboutPage;
