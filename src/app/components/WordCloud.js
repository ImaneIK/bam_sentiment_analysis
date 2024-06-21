import React, { useState, useEffect } from 'react';

const WordCloud = ({ text }) => {
  const [wordCloudUrl, setWordCloudUrl] = useState('');

  useEffect(() => {
    const fetchWordCloud = async () => {
      try {
        const response = await fetch('/api/generate_word_cloud', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text }),
        });
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setWordCloudUrl(url);
      } catch (error) {
        console.error('Error fetching word cloud:', error);
      }
    };

    fetchWordCloud();
  }, [text]);

  return (
    <div>
      {wordCloudUrl ? (
        <img src={wordCloudUrl} alt="Word Cloud" />
      ) : (
        <p>Loading word cloud...</p>
      )}
    </div>
  );
};

export default WordCloud;
