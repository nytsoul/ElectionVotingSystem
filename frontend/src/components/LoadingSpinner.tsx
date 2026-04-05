import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-96">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
      <span className="ml-4 text-white text-xl font-semibold">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
