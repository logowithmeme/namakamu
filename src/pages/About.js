// src/pages/About.js
import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sunset1 to-sunset2 p-6 text-textAccent">
      <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-lg p-8 rounded-3xl shadow-xl space-y-6">
        <h1 className="text-3xl font-bold text-center">💌 About</h1>

        <p className="text-lg leading-relaxed text-center">
          These days, love has many names: <span className="font-semibold">flirtationships</span>, <span className="font-semibold">situationships</span>,
          <span className="font-semibold"> situations with benefits</span>, and <span className="font-semibold">emotional attachments without clarity</span>.
          We’re all somewhere between feelings and confusion.
        </p>

        <p className="text-md text-center">
          Namakamu isn’t here to judge — it’s here to pause.  
          To help you ask, “Is this real?”, “Am I ready?”, “Do I mean this?”
          A space for two hearts to talk — truly.
        </p>

        <p className="italic text-center">
          “Before you give your heart, give your mind a moment to breathe.”
        </p>

        <div className="text-sm text-center text-gray-600 pt-4">
          Think. Talk. Decide.  
          In private. Without pressure.  
          <br />
          <span className="block mt-1 font-semibold">– JK</span>
        </div>
      </div>
    </div>
  );
};

export default About;
