import React from 'react';

const SectionAnalysis = ({ sections, handleReadMore }) => {

  const sentimentColors = {
    Negative: "bg-red-200",
    Neutral: "bg-blue-200",
    Positive: "bg-green-200",
  };

  return (

    <div className="flex flex-1 flex-col p-4 bg-white rounded border border-1 decoration-gray-400 justify-center overflow-hidden ">
                <div className="flex justify-between text-sm font-semibold text-gray-500 text-center m-3">
                  <div>Analysis by sections</div>

                  {sections.length > 0 && (
                    <div
                    onClick={() => handleReadMore(sections.map((result) => result.section))}
                      className=" text-white p-2"
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

                <div className="max-h-[200px] overflow-hidden text-content ">
                  {sections.map((result, index) => (
                    <p
                      key={index}
                      className={`text-xs font-light ${
                        sentimentColors[result.sentiment]
                      }`}
                    >
                      {result.section}
                    </p>
                  ))}
                </div>
              </div>


  );
};

export default SectionAnalysis;
