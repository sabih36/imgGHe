
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full text-center my-6">
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-indigo-500 to-cyan-400 text-transparent bg-clip-text animate-gradient-x">
        AI Image Generator
      </h1>
      <p className="text-slate-400 mt-2 text-lg">
        Craft your vision. Powered by Gemini.
      </p>
    </header>
  );
};
