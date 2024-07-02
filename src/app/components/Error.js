// src/app/components/TextForm.js
import React from 'react';

const Error = ({ error, setError, setText }) => {
 

  return (
    <div className="mt-4 text-center">
    <p className="text-red-500">{error}</p>
    <button
      onClick={() => {
        setError(null);
        setText("");
      }}
      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
    >
      Try Again
    </button>
  </div>
  )
};

export default Error
