// src/app/page.js
"use client";
import PieChart from "../app/components/Chart";
import BarChartWords from "../app/components/BarChartWords";
import "tailwindcss/tailwind.css";
import Modal from "../app/components/Modal";
import Image from 'next/image';

import React, { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import TextStats from "./components/TextStats";
import NamedEntities from "./components/NamedEntities";
import { downloadCSV } from "./components/DownloadCSV";
import { downloadPDF } from "./components/DownloadPDF";

export default function Home() {
  const [text, setText] = useState("");
  const [wordCloudUrl, setWordCloudUrl] = useState("");
  const [namedEntities, setNamedEntities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [textStats, setTextStats] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [pubDate, setPubDate] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "We Analyze The Feelings Between The Lines.";
  const [isDisabled, setIsDisabled] = useState(true);
  const [sections, setSections] = useState([]);
  const [modalContent, setModalContent] = useState("");
  const [showTextModal, setShowTextModal] = useState(false);

  const sentimentColors = {
    Negative: "bg-red-200",
    Neutral: "bg-blue-200",
    Positive: "bg-green-200",
  };

  const handleChange = (event) => {
    setText(event.target.value);
    setIsDisabled(event.target.value.length < 50);
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePubDate = (e) => {
    setPubDate(e.target.value);
  };

  const handleReadMore = (content) => {
    console.log("handleReadMore called with content:", content);
    const joinedContent = content.join("\n\n");
    console.log("Modal content:", joinedContent);
    setModalContent(content);
    setShowTextModal(true);
  };

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
    labels: ["Negative", "Neutral", "Positive"],
    datasets: [
      {
        label: "Sentiment Probabilities",
        data: [0, 0, 0],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        // barThickness: 5,
      },
    ],
  });

  const [wordChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Most Common Words",
        data: [],
        backgroundColor: ["#FF6384"],
        hoverBackgroundColor: ["#FF6384"],
      },
    ],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setTextStats(null);

    const article = {
      title: title || 'NaN',
      input_article: text,
      publication_date: pubDate || 'NaN',
      
    };


    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch sentiment analysis.");
      }

      const result = await response.json();
      setResult(result);
      console.log(result);
      
      // const maxProbability = Math.max(...result.probabilities);
      // const percentage = `${( Math.max(...result.probabilities) * 100 ).toFixed(0)}%`
      

      setChartData({
        labels: ["Negative", "Neutral", "Positive"],
        datasets: [
          {
            label: "Sentiment Probabilities",
            data: result.probabilities,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      });

      const response1 = await fetch("http://localhost:5000/common_words", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response1.ok) {
        throw new Error("Failed to fetch common words.");
      }

      const wordResults = await response1.json();
      const labels = wordResults.map((item) => item[0]);
      const data = wordResults.map((item) => item[1]);

      setBarChartData({
        labels: labels,
        datasets: [
          {
            label: "Most Common Words",
            data: data,
            backgroundColor: "#36A2EB",
            hoverBackgroundColor: "#36A2EC",
          },
        ],
      });

      // Fetch word cloud image
      const response2 = await fetch(
        "http://localhost:5000/generate_word_cloud",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );

      if (!response2.ok) {
        throw new Error("Failed to fetch word cloud.");
      }

      const blob = await response2.blob();
      const url = URL.createObjectURL(blob);
      setWordCloudUrl(url);

      // Fetch named entities
      const response3 = await fetch("http://localhost:5000/named_entities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response3.ok) {
        throw new Error("Failed to fetch named entities.");
      }

      const entities = await response3.json();
      setNamedEntities(entities);

      const response4 = await fetch("http://localhost:5000/text_summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response4.ok) {
        throw new Error("Failed to fetch data.");
      }

      const textSummaryResult = await response4.json();

      setTextStats(textSummaryResult);

      const response5 = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data1 = await response5.json();
      console.log(data1);
      setSections(data1);

      
      



    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // named entities modal
  const renderModal = () => (
    <div className="fixed inset-0 flex items-center justify-center text-center bg-gray-900 bg-opacity-50">
      <div className="bg-white px-6 rounded shadow-md max-w-lg w-full h-2/3 overflow-y-auto">
        <header class="flex justify-between items-center border-b border-gray-100 px-5 py-4">
          <div class="font-semibold text-gray-800">All Named Entities</div>
          <button
            className=" text-gray-500 py-2 px-4 rounded "
            onClick={() => setShowModal(false)}
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

        <div class="flex flex-col justify-center">
          <div class="mx-auto w-full max-w-2xl rounded-sm border border-gray-200 bg-white ">
            <div class=" p-3 text-center w-full">
              <table class=" table-auto w-full">
                <thead class="bg-gray-50 text-sm font-semibold uppercase text-gray-400">
                  <tr>
                    <th class="p-2">
                      <div class="text-center font-semibold">Entity</div>
                    </th>
                    <th class="p-2">
                      <div class="text-center font-semibold">Type</div>
                    </th>
                  </tr>
                </thead>

                <tbody class="divide-y divide-gray-100 text-sm text-center">
                  {namedEntities.map((entity, index) => (
                    <tr key={index}>
                      <td class="p-2">{entity.text}</td>

                      <td class="p-2">({entity.label})</td>
                    </tr>
                  ))}

                
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const handleDownloadCSV = async () => {
    setLoading(true);

    const article = {
      title: title || 'Untitled',
      input_article: text || 'No content provided',
      publication_date: pubDate || 'Unknown date',
      prediction : result.prediction,
      percentage : `${( Math.max(...result.probabilities) * 100 ).toFixed(0)}%`,
      named_entities: namedEntities,
      common_words:wordChartData.labels,
  };

    await downloadCSV(article);
    setLoading(false);
};


const handleDownloadPDF = async () => {
  setLoading(true);

  const article = {
    title: title || 'Untitled',
    input_article: text || 'No content provided',
    publication_date: pubDate || 'Unknown date',
    prediction : result.prediction,
    percentage : `${( Math.max(...result.probabilities) * 100 ).toFixed(0)}%`,
    named_entities: namedEntities,
    common_words:wordChartData.labels,
};

  await downloadPDF(article);
  setLoading(false);
};

  const handleCancel = () => {
    setText("");
    setIsDisabled(true);
    
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const Modal = () => {
    console.log("renderModal called, showTextModal:", showTextModal);
    console.log("modalContent:", modalContent);
    if (!showTextModal) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto">
          <header class="flex justify-between items-center border-b border-gray-100 px-5 py-4">
            <div class="font-semibold text-gray-800">
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

  return (
    <div className=" xl:h-screen ">
      
      

      <div className=" flex flex-col h-full w-full items-center   ">
        {/* the textarea */}
        {!result && !loading &&(
          <TextForm title={title} text={text}  pubDate={pubDate}  displayedText={displayedText}
          handleTitleChange={handleTitleChange}  handleChange={handleChange} handlePubDate={handlePubDate}
          handleSubmit={handleSubmit} handleCancel={handleCancel} isDisabled={isDisabled} />
        )}

        {/* loader */}
        {loading && ( <Loader/> )}

        {/* error */}
        {error && (
          <Error error={error} setError={setError} setText={setText} />
        )}

        {/* response */}
        {result && !loading && (
          <div className="flex flex-col gap-4 p-6 w-full">

            {/* Navbar */}
            <Navbar onRefresh={handleRefresh} handleDownloadCSV={handleDownloadCSV} handleDownloadPDF={handleDownloadPDF} loading={loading} />
            <div>
            
            </div>
            {title && (
              <div className="article-title-display flex justify-between text-sm bg-white w-full p-3  border border-1 decoration-gra-200 rounded-md ">
                <h2 className="block font-semibold uppercase">{title}</h2>
                {pubDate && <h2 className="block">published on: {pubDate}</h2>}
              </div>
            )}

            {/* first row */}
            <div className=" flex flex-col lg:flex-row gap-6">
              <div className="flex-1 ">
                {/* text stats */}
                <div className="flex-1 border text-center border-1 bg-white decoration-gray-200 rounded-md text-xs h-full">
                  <h3 className="text-sm my-3 font-semibold text-gray-500">
                    Summary
                  </h3>
                  {textStats && (
                    <TextStats textStats={textStats} />
                  )}
                </div>
              </div>

              {/* pie chart and named entities */}
              <div className="flex flex-col gap-3 flex-1">
                {/* the pie chart */}
                <div className="px-2 py-6 text-center  flex-1 bg-white border border-1 decoration-gray-200 rounded-md text-2xl font-semibold text-gray-500">
                  <p className="mt-6">{result.prediction}</p>
                  <p className="my-1 ">{`${(
                    Math.max(...result.probabilities) * 100
                  ).toFixed(0)}%`}</p>

                  <PieChart data={chartData} className="h-96" />
                </div>

                {/* named entities */}
                <NamedEntities namedEntities={namedEntities} setShowModal={setShowModal} />

              </div>

              {/* the wordcloud */}
              <div className="flex-1 text-center border border-1 bg-white decoration-gray-200 rounded-md">
                {wordCloudUrl && (
                  <div className="p-0 m-0">
                    <h2 className="mt-6 text-sm font-semibold text-gray-500">
                      Word Cloud
                    </h2>
                    <img src={wordCloudUrl} alt="Word Cloud" />
                  </div>
                )}
              </div>
            </div>

            {/* second row: section analysis and barchart */}
            <div className="flex flex-col lg:flex-row gap-3 min-h-[200px]">
              {/* section analysis */}
              <div className="flex flex-1 flex-col p-4 bg-white rounded border border-1 decoration-gray-400 justify-center overflow-hidden ">
                <div className="flex justify-between text-sm font-semibold text-gray-500 text-center m-3">
                  <div>Analysis by sections</div>

                  {sections.length > 0 && (
                    <div
                      onClick={() =>
                        handleReadMore(sections.map((result) => result.section))
                      }
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

              {/* the bar chart */}
              <div className="p-4 flex-1 border border-1 bg-white decoration-gray-200 rounded-md ">
                <BarChartWords className="w-full h-full" data={wordChartData} />
              </div>
            </div>
          </div>
        )}

        {/* end - do not delete */}
      </div>

      {showModal && renderModal()}

      {showTextModal && (
        <Modal onClose={() => setShowTextModal(false)} content={modalContent} />
      )}
    </div>
  );
}
