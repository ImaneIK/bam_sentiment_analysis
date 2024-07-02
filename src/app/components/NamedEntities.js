import React from 'react';

const NamedEntities = ({ namedEntities, setShowModal }) => {
  return (
    <div className="flex py-6 flex-col gap-2 flex-1 border border-1 bg-white justify-center items-center decoration-gray-200 rounded-md text-sm">
      <div
        className={
          namedEntities.length > 4
            ? "text-sm font-semibold text-gray-500 p-3 flex justify-between items-center w-full"
            : "text-sm font-semibold p-3 flex justify-center items-center w-full"
        }
      >
        <div className="text-gray-500">Named entities</div>

        {/* show more named entities - button */}
        <div className="flex flex-wrap">
          {namedEntities.length > 4 && (
            <div
              className="text-white p-2"
              onClick={() => setShowModal(true)}
            >
              <svg
                width="15"
                height="15"
                className="fill-gray-400 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M200 32H56C42.7 32 32 42.7 32 56V200c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l40-40 79 79-79 79L73 295c-6.9-6.9-17.2-8.9-26.2-5.2S32 302.3 32 312V456c0 13.3 10.7 24 24 24H200c9.7 0 18.5-5.8 22.2-14.8s1.7-19.3-5.2-26.2l-40-40 79-79 79 79-40 40c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H456c13.3 0 24-10.7 24-24V312c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2l-40 40-79-79 79-79 40 40c6.9 6.9 17.2 8.9 26.2 5.2s14.8-12.5 14.8-22.2V56c0-13.3-10.7-24-24-24H312c-9.7 0-18.5 5.8-22.2 14.8s-1.7 19.3 5.2 26.2l40 40-79 79-79-79 40-40c6.9-6.9 8.9-17.2 5.2-26.2S209.7 32 200 32z" />
              </svg>
            </div>
          )}
        </div>
      </div>

      <ul className="flex flex-wrap justify-center items-center gap-2">
        {namedEntities.slice(0, 4).map((entity, index) => (
          <li key={index} className="block">
            <div className="text-xs inline-flex justify-center items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-arrow-right mr-2"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
              {entity.text} ({entity.label})
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NamedEntities;
