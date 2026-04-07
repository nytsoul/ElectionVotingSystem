import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="dark-container flex flex-col justify-center items-center h-screen">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-slate-700"></div>
        <div className="absolute inset-0 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin shadow-neon"></div>
      </div>
      <span className="text-white text-2xl font-bold mb-4">Loading...</span>
      <div className="flex gap-2">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
