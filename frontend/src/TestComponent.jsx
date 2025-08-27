import React from 'react';

const TestComponent = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Tailwind CSS Test</h1>
        <p className="text-gray-600 text-center">
          If you see styled elements below, Tailwind CSS is working!
        </p>
        
        <div className="space-y-4">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200">
            Primary Button
          </button>
          
          <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition duration-200">
            Secondary Button
          </button>
          
          <div className="bg-green-100 border border-green-200 text-green-800 p-4 rounded-lg">
            <p className="font-medium">Success Message</p>
            <p className="text-sm">Tailwind CSS is working properly!</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-red-500 h-16 rounded-lg"></div>
            <div className="bg-yellow-500 h-16 rounded-lg"></div>
            <div className="bg-green-500 h-16 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestComponent;