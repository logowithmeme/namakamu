import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sunset1 to-sunset2 p-8 text-center text-textAccent font-playfair">
      <div className="max-w-xl">
        <h1 className="text-3xl font-bold mb-4">About Namakamu</h1>
        <p className="text-lg mb-3">
          Built for the generation that feels more than it speaks.
        </p>
        <p className="text-sm mb-2">
          In a world full of <strong>flirtationships</strong>, <strong>situationships</strong>, and silent connections —
          Namakamu is a space to slow down, connect deeply, and decide wisely.
        </p>
        <p className="text-sm">Create real memories before they fade into pixels.</p>
        <p className="mt-6 font-semibold text-sm">— JK</p>
      </div>
    </div>
  );
};

export default AboutPage;
