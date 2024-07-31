import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-12 h-12 border-8 border-gray-300 border-t-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;
