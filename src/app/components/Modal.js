import React from 'react';

const Modal = ({ setShowTextModal, modalContent, sections }) => {

  const sentimentColors = {
    Negative: "bg-red-200",
    Neutral: "bg-blue-200",
    Positive: "bg-green-200",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
          <header className="flex justify-between items-center border-b border-gray-100 px-5 py-4">
            <div className="font-semibold text-gray-800">
              Sentiment analysis by sections
            </div>
            <button
              className=" text-gray-500 py-2 px-4 rounded "
              onClick={() => setShowTextModal(false)}
            >
              <svg
                width="20"
                height="20"
                className="fill-gray-400 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </button>
          </header>

          <div className="p-4">
            {modalContent.map((result, index) => (
              <p
                key={index}
                className={` text-sm font-light ${
                  sentimentColors[sections[index].sentiment]
                }`}
              >
                {result}
              </p>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Modal;
