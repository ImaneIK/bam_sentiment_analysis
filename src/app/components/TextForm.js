// src/app/components/TextForm.js
import React from 'react';

const TextForm = ({ title, text, displayedText, pubDate, handleTitleChange, handleChange, handlePubDate, handleSubmit, handleCancel, isDisabled }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8 text-center xl:text-left w-full min-h-screen p-3 xl:p-12 lg:overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
      
      {/* BLOB - Enhanced with better positioning */}
      <div className="relative w-full md:w-[0px] hidden md:block pointer-events-none">
        <div className="absolute flex flex-col">
          <div className="flex justify-end">
            <div className="-m-12 bg-gradient-radial from-purple-400/30 to-transparent h-96 w-96 p-4 rounded-full shadow-2xl filter blur-3xl animate-pulse"></div>
            <div className="-m-12 bg-gradient-radial from-blue-500/40 to-blue-200/20 h-96 w-96 p-4 rounded-full shadow-2xl filter blur-2xl"></div>
          </div>
          <div className="-my-24">
            <div className="bg-gradient-radial from-green-500/40 to-green-100/20 h-96 w-96 p-4 rounded-full shadow-2xl filter blur-3xl"></div>
          </div>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row lg:overflow-hidden z-30 w-full gap-8'>
        
        {/* LEFT - Enhanced typography and spacing */}
        <div className="h-full bg-transparent flex-1 p-6 md:p-12 z-30 flex flex-col justify-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-indigo-600 via-blue-600 to-green-600 bg-clip-text text-transparent animate-fade-in">
              {displayedText}
            </h1>
            
            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-green-500 rounded-full"></div>
            
            <p className="text-sm md:text-base text-gray-700 text-justify leading-relaxed max-w-2xl">
              In today's dynamic economic landscape, understanding public sentiment towards central bank policies is crucial. Our powerful sentiment analysis tool empowers you to delve into press coverage surrounding Bank Al-Maghrib's decisions. Go beyond the headlines and uncover hidden trends in public opinion.
            </p>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-md border border-indigo-100">
              <h3 className="text-sm font-semibold text-indigo-700 mb-3">Gain actionable insights to:</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 mt-1">●</span>
                  <span>Measure the effectiveness of recent policy changes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 mt-1">●</span>
                  <span>Anticipate potential market reactions based on public sentiment.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-500 mt-1">●</span>
                  <span>Make data-driven decisions that align with the public's economic concerns.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT - Enhanced form with better UX */}
        <div className="z-30 w-full lg:max-w-xl animate-fade-in duration-100 bg-white rounded-2xl px-6 md:px-10 py-8 mx-auto flex-1 flex flex-col text-gray-800 shadow-2xl border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-800">Sentiment Analysis</h3>
            <p className="text-xs text-gray-500 mt-1">Fill in the form to analyze your content</p>
          </div>
          
          <div className="space-y-4 flex-1">
            <div className="group">
              <label className="block text-xs font-semibold text-gray-700 mb-2">Article Title</label>
              <input
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg p-3 outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:shadow-md text-sm"
                spellCheck="false"
                placeholder="Enter the article title"
                type="text"
                value={title}
                onChange={handleTitleChange}
              />
            </div>

            <div className="group">
              <label className="block text-xs font-semibold text-gray-700 mb-2">Article Content</label>
              <textarea
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg p-3 outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:shadow-md resize-none text-sm leading-relaxed"
                spellCheck="false"
                placeholder="Paste or type your article content here..."
                value={text}
                onChange={handleChange}
                rows="8"
                required
              ></textarea>
            </div>

            <div className="group">
              <label className="block text-xs font-semibold text-gray-700 mb-2">Publication Date</label>
              <input
                onChange={handlePubDate}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg p-3 outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:shadow-md text-sm"
                spellCheck="false"
                placeholder="Select publication date"
                type="date"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <svg
                className="cursor-pointer hover:text-indigo-600 text-gray-400 transition-colors duration-200 border-2 border-gray-200 hover:border-indigo-400 rounded-full p-1.5 h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
              <span className="text-xs text-gray-400">Attach files</span>
            </div>
          </div>

          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
            <button
              onClick={handleCancel}
              type="reset"
              className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 font-semibold cursor-pointer text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isDisabled}
              className={`flex-1 rounded-lg px-4 py-3 font-semibold cursor-pointer text-sm transition-all duration-200 ${
                !isDisabled 
                  ? "bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" 
                  : "bg-gray-200 border-2 border-gray-300 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isDisabled ? "Processing..." : "Analyze Content"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextForm;
