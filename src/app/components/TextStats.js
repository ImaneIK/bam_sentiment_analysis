import React from 'react';

const TextStats = ({ textStats }) => {
  return(

    <div className="">
                      <div className="p-2 m-2 flex justify-between rounded-md bg-indigo-100 text-indigo-500 font-semibold">
                        <span>Word Count</span>{" "}
                        <span className="px-1 py-0.5  bg-indigo-50 rounded-md">
                          {textStats.num_words}
                        </span>
                      </div>
                      <div className="p-2 m-2 flex justify-between rounded-md bg-yellow-100 text-indigo-500 font-semibold">
                        <span>Sentence Count</span>{" "}
                        <span className="px-1 py-0.5 bg-yellow-50 rounded-md">
                          {textStats.num_sentences}
                        </span>
                      </div>
                      <div className="p-2 m-2 flex justify-between rounded-md bg-red-100 text-indigo-500 font-semibold">
                        <span>Average Word Length</span>{" "}
                        <span className="px-1 py-0.5 bg-red-50 rounded-md">
                          {" "}
                          {textStats.avg_word_length.toFixed(2)}
                        </span>
                      </div>
                      <div className="p-2 m-2 flex justify-between rounded-md bg-green-100 text-indigo-500 font-semibold">
                        <span>Average Sentence Length</span>{" "}
                        <span className="px-1 py-0.5 bg-green-50 rounded-md">
                          {" "}
                          {textStats.avg_sentence_length.toFixed(2)}
                        </span>
                      </div>
                      <div className="p-2 m-2 flex justify-between rounded-md bg-blue-100 text-indigo-500 font-semibold">
                        <span>Vocabulary Richness</span>{" "}
                        <span className="px-1 py-0.5 bg-blue-50 rounded-md">
                          {" "}
                          {textStats.vocabulary_richness.toFixed(2) * 100}%
                        </span>
                      </div>
                      <div className="p-2 m-2 flex justify-between rounded-md bg-orange-100 text-indigo-500 font-semibold">
                        <span>Readability (Flesch)</span>{" "}
                        <span className="px-1 py-0.5 bg-orange-50 rounded-md">
                          {" "}
                          {textStats.readability_flesch.toFixed(2)}
                        </span>
                      </div>
                      <div className="p-2 m-2 flex justify-between rounded-md bg-cyan-100 text-indigo-500 font-semibold">
                        <span>Readability (Flesch-Kincaid Grade)</span>{" "}
                        <span className="px-1 py-0.5 bg-cyan-50 rounded-md">
                          {" "}
                          {textStats.readability_fk_grade.toFixed(2)}
                        </span>
                      </div>
                      <div className="p-2 m-2 flex justify-between rounded-md bg-gray-100 text-indigo-500 font-semibold">
                        <span>Readability (Gunning Fog)</span>{" "}
                        <span className="px-1 py-0.5 bg-gray-50 rounded-md">
                          {" "}
                          {textStats.readability_gunning_fog.toFixed(2)}
                        </span>
                      </div>
                    </div>

  )};

export default TextStats;