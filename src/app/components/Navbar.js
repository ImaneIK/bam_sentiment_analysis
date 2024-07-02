// src/app/components/Navbar.js
import React from 'react';

const Navbar = ({ onRefresh }) => {
  return (
    <nav className="flex justify-between px-6 py-4 items-center bg-white">
      <h1 className="text-xl text-gray-800 font-bold">Sentiment Analyzer</h1>
      <div className="flex items-center">
        <button className="p-2 bg-green-500 text-white font-semibold text-xs rounded-md" onClick={onRefresh}>New Analysis</button>
      </div>
    </nav>
  );
};

export default Navbar;
