// src/app/page.js
"use client"; 
import PieChart from '../app/components/Chart';
import BarChartWords from '../app/components/BarChartWords';
import 'tailwindcss/tailwind.css';


import React, { useState, useEffect } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [wordCloudUrl, setWordCloudUrl] = useState('');
  const [namedEntities, setNamedEntities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [textStats, setTextStats] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Welcome to Sentiment Analyzer !!!';


  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(interval);
      }
    }, 100); // Adjust the speed by changing the interval time
    return () => clearInterval(interval);
  }, []);


  const [chartData, setChartData] = useState({
    labels: ['Negative', 'Neutral', 'Positive'],
    datasets: [
      {
        label: 'Sentiment Probabilities',
        data: [0, 0, 0],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        // barThickness: 5,
      },
    ],
  });


  const [wordChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Most Common Words',
        data: [],
        backgroundColor: ['#FF6384'],
        hoverBackgroundColor: ['#FF6384'],
      },
    ],
  });

  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setTextStats(null);
    
    try{
      
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch sentiment analysis.');
      }
  
      const result = await response.json();
      setResult(result);
      console.log(result);
      // const maxProbability = Math.max(...result.probabilities);
      // const percentage = `${(maxProbability * 100).toFixed(2)}%`;

  
  
      setChartData({
        labels: ['Negative', 'Neutral', 'Positive'],
        datasets: [
          {
            label: 'Sentiment Probabilities',
            data: result.probabilities,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      });
  
  
      const response1 = await fetch('http://localhost:5000/common_words', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
  
      if (!response1.ok) {
        throw new Error('Failed to fetch common words.');
      }
  
      const wordResults = await response1.json();
      const labels = wordResults.map(item => item[0]);
      const data = wordResults.map(item => item[1]);
  
      setBarChartData({
        labels: labels,
        datasets: [
          {
            label: 'Most Common Words',
            data: data,
            backgroundColor: '#36A2EB',
            hoverBackgroundColor: '#36A2EC',
            
          },
        ],
      });
  
  
      // Fetch word cloud image
      const response2 = await fetch('http://localhost:5000/generate_word_cloud', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
  
      if (!response2.ok) {
        throw new Error('Failed to fetch word cloud.');
      }
  
      const blob = await response2.blob();
      const url = URL.createObjectURL(blob);
      setWordCloudUrl(url);


      // Fetch named entities
      const response3 = await fetch('http://localhost:5000/named_entities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response3.ok) {
        throw new Error('Failed to fetch named entities.');
      }

      const entities = await response3.json();
      setNamedEntities(entities);



      const response4 = await fetch('http://localhost:5000/text_summary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text }),
        });

        if (!response4.ok) {
          throw new Error('Failed to fetch data.');
        }

      const textSummaryResult = await response4.json();

      setTextStats(textSummaryResult);
  
    } catch(error){
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }

    
  } 



  const renderModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md max-w-lg w-full h-2/3 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">All Named Entities</h2>
        <ul>
          {namedEntities.map((entity, index) => (
            <li key={index}>
              <div class="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full" >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-arrow-right mr-2"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>{entity.text} ({entity.label})</div>
            </li>
          ))}
        </ul>
        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );


  const handleCancel = () => {
    setText('');
  };



  return (
    <div className=' bg-gray-50 h-screen'>
        
        
        {/* Navbar */}
      <div>
      <nav class="flex justify-between px-20 py-4 items-center bg-white">
  <h1 class="text-xl text-gray-800 font-bold">Sentiment Analyzer</h1>
  <div class="flex items-center">
    
    <ul class="flex items-center space-x-6">
      <li class="font-semibold text-gray-700">Home</li>
      <li class="font-semibold text-gray-700">Articles</li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      </li>
      <li>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </li>
    </ul>
  </div>
</nav>
      </div>
      

      <div className=' flex flex-col h-full w-full items-center'>
        
       
        
        {/* the textarea */}
        { !result && (
        <div className='flex w-full h-full'>
          
          <div className='p-4 h-full bg-indigo-400 w-1/4 text-white '>
          <h1 className="text-3xl font-bold my-6">{displayedText}</h1>
          <p className='text-xs text-justify'>Designed to analyze press articles related to the monitary policy of the central bank of Morocco "Bank Al-Maghrib" </p>
          </div>

          <div className="editor mx-auto flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg w-full">
            <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellCheck="false" placeholder="Title" type="text"/>
            <textarea 
            className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none mb-4" 
            spellCheck="false" 
            placeholder="Describe everything about this post here"
            value={text}
            onChange={(e) => setText(e.target.value)}
            ></textarea>
            <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellCheck="false" placeholder="publication date" type="date"/>

            <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" spellCheck="false" placeholder="Choose model" type="text"/>

            
            <div className="icons flex text-gray-500 m-2">
              <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
              <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
            </div>
            <div className="buttons flex" >
              <div onClick={handleCancel}  type="reset" className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">Cancel</div>
              <div type="submit" onClick={handleSubmit} className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Post</div>
            </div>
          </div>
        </div> )}

        {/* loader */}
        {loading && (
        <div className="mt-4">
<div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
    <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64"></div>
</div>        </div>
        )}

        {/* error */}
        {error && (
        <div className="mt-4 text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setText('');
            }}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
        )}


        {/* response */}
        {result && !loading && (

      <div className='flex flex-col gap-6 p-6 w-full'>


        <div className=' flex flex-row gap-6'>


         
          <div className='flex-1 '>

             {/* text stats */}
             <div className='flex-1 border text-center border-1 bg-white decoration-gray-200 rounded-md text-xs'>
              <h3 className='text-lg my-3'>Summary</h3>
            {textStats && (
                  <div className="">
                    <div className='p-2 m-2 flex justify-between rounded-md bg-indigo-100 text-indigo-500 font-semibold'><span>Word Count</span> <span className='px-1 py-0.5  bg-indigo-50 rounded-md'>{textStats.num_words}</span></div>
                    <div className='p-2 m-2 flex justify-between rounded-md bg-yellow-100 text-indigo-500 font-semibold'><span>Sentence Count</span> <span className='px-1 py-0.5 bg-yellow-50 rounded-md'>{textStats.num_sentences}</span></div>
                    <div className='p-2 m-2 flex justify-between rounded-md bg-red-100 text-indigo-500 font-semibold'><span>Average Word Length</span> <span className='px-1 py-0.5 bg-red-50 rounded-md'> {textStats.avg_word_length.toFixed(2)}</span></div>
                    <div className='p-2 m-2 flex justify-between rounded-md bg-green-100 text-indigo-500 font-semibold'><span>Average Sentence Length</span> <span className='px-1 py-0.5 bg-green-50 rounded-md'> {textStats.avg_sentence_length.toFixed(2)}</span></div>
                    <div className='p-2 m-2 flex justify-between rounded-md bg-blue-100 text-indigo-500 font-semibold'><span>Vocabulary Richness</span> <span className='px-1 py-0.5 bg-blue-50 rounded-md'> {textStats.vocabulary_richness.toFixed(2)}</span></div>
                    <div className='p-2 m-2 flex justify-between rounded-md bg-orange-100 text-indigo-500 font-semibold'><span>Readability (Flesch)</span> <span className='px-1 py-0.5 bg-orange-50 rounded-md'> {textStats.readability_flesch.toFixed(2)}</span></div>
                    <div className='p-2 m-2 flex justify-between rounded-md bg-cyan-100 text-indigo-500 font-semibold'><span>Readability (Flesch-Kincaid Grade)</span> <span className='px-1 py-0.5 bg-cyan-50 rounded-md'> {textStats.readability_fk_grade.toFixed(2)}</span></div>
                    <div className='p-2 m-2 flex justify-between rounded-md bg-gray-100 text-indigo-500 font-semibold'><span>Readability (Gunning Fog)</span> <span className='px-1 py-0.5 bg-gray-50 rounded-md'> {textStats.readability_gunning_fog.toFixed(2)}</span></div>

                  </div>
                )}
            </div>

              

          </div>
             


          {/* the pie chart */}
          <div className='px-2 text-center  flex-1 bg-white border border-1 decoration-gray-200 rounded-md '>
              
            <p className='mt-6'>{result.prediction}</p>
            <p className='mt-1 mb-6'>{`${((Math.max(...result.probabilities)) * 100).toFixed(0)}%`}</p>
           
            <PieChart data={chartData} className="h-96"/>
          </div>


        

          {/* the wordcloud */}
          <div className='flex-1 text-center border border-1 bg-white decoration-gray-200 rounded-md'>
          {wordCloudUrl && (
          <div className='p-0 m-0'>
            <h2 className='mt-6'>Word Cloud</h2>
            <img src={wordCloudUrl} alt="Word Cloud" />
          </div>
          )}
          </div>

        </div>




        <div className='flex gap-6'>

           {/* the bar chart */}
        <div className='p-4 flex-1 border border-1 bg-white decoration-gray-200 rounded-md w-1/2'>
          <BarChartWords data={wordChartData}/>
        </div>


        {/* named entities */}
           <div className='p-4 flex-1 p-2 border border-1 bg-white decoration-gray-200 rounded-md text-xs'>
          
          <h3>Named Entities:</h3>
              <ul >
              { namedEntities.slice(0, 5).map((entity, index) => (
                    <li key={index} className='m-1'>
                      <div class="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full" >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-arrow-right mr-2"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                        {entity.text} ({entity.label})
                      </div>
                    </li>
                  ))}
                
              </ul>

              {/* show more named entities - button */}
              {namedEntities.length > 5 && (
                <button
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => setShowModal(true)}
                >
                  View All
                </button>
              )}
             </div>

           
        
          
        </div>

       

      </div>

      )}

        

        
      </div>

      {showModal && renderModal()}
    </div>
  );
}
