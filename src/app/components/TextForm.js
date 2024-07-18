// src/app/components/TextForm.js
import React from 'react';

const TextForm = ({ title, text, displayedText, pubDate, handleTitleChange, handleChange, handlePubDate, handleSubmit, handleCancel, isDisabled }) => {
  return (

    <div className="flex flex-col lg:flex-row gap-8 text-center xl:text-left w-full h-full p-3 xl:p-12 lg:overflow-hidden  bg-green-50">
           
           

          {/* BLOB */}
          <div className="relative w-full md:w-[0px] hidden md:block">
          <div className="absolute flex flex-col ">
            
            <div className="flex justify-end ">
              <div className="-m-12 bg-gradient-radial from-transparent to-transparent h-96 w-96  p-4 rounded-full shadow-xl filter blur-3xl"></div>
              <div className="-m-12 bg-gradient-radial from-blue-700 to-blue-200  h-96 w-96  p-4 rounded-full shadow-xl filter blur-2xl"></div>
            </div>

            <div className="-my-24">
              <div className="bg-gradient-radial from-green-600 to-green-100  h-96 w-96  p-4 rounded-full shadow-xl filter blur-3xl"></div>
            </div>
            
          </div>
          </div>
                 
          

            <div className='flex flex-col lg:flex-row lg:overflow-hidden z-30 w-full'>
               {/* LEFT */}
            <div className="h-full bg-transparent flex-1 text-indigo-500 p-6 md:p-12 z-30 ">
              <h1 className="text-5xl font-bold my-6 leading-snug">{displayedText}</h1>
              <p className="text-xs text-justify ">
                In today's dynamic economic landscape, understanding public sentiment towards central bank policies is crucial. Our powerful sentiment analysis tool empowers you to delve into press coverage surrounding Bank Al-Maghrib's decisions. Go beyond the headlines and uncover hidden trends in public opinion. Gain actionable insights to:
              </p>
              <ul className="text-xs text-justify list-disc m-2 md:m-6">
                <li>Measure the effectiveness of recent policy changes.</li>
                <li>Anticipate potential market reactions based on public sentiment.</li>
                <li>Make data-driven decisions that align with the public's economic concerns.</li>
              </ul>

              

            </div>

            {/* RIGHT */}
            <div className="z-30 w-full animate-fade-in duration-100 animate-slow editor bg-white rounded-md px-6 md:px-12 py-6 text-xs mx-auto flex-1 flex flex-col text-gray-800 border border-gray-300 shadow-lg ">
             
             <h3 className="text-xs font-semibold text-center my-6 text-gray-500">Fill in the form with the necessary infos</h3>
             
              <input
                className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                spellCheck="false"
                placeholder="Title"
                type="text"
                value={title}
                onChange={handleTitleChange}
              />

              <textarea
                className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none mb-4"
                spellCheck="false"
                placeholder="Describe everything about this post here"
                value={text}
                onChange={handleChange}
                required
              ></textarea>

              <input
                onChange={handlePubDate}
                className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
                spellCheck="false"
                placeholder="publication date"
                type="date"
              />

              <div className="icons flex text-gray-500 m-2">
                {/* <svg
                  className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <svg
                  className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg> */}
                <svg
                  className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7"
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
                {/* <div className="count ml-auto text-gray-400 text-sm font-semibold">
                  0/300
                </div> */}
              </div>
              <div className="buttons flex">
                <div
                  onClick={handleCancel}
                  type="reset"
                  className="btn border rounded-md border-gray-300 px-4 py-2 font-semibold cursor-pointer text-gray-500 ml-auto"
                >
                  Cancel
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isDisabled}
                  className={ !isDisabled ? "btn border border-indigo-500 rounded-md px-4 py-2 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500" : "bg-blue-200 border border-blue-500 rounded-md p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2"}
                >
                  Analyze
                </button>
              </div>
            </div>
            </div>
           
    </div>

  )};

  export default TextForm;