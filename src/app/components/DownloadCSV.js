export const downloadCSV = async (article) => {
  try {
      const response = await fetch('http://localhost:5000/export', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ articles: [article] }),
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'analysis_results.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
  } catch (error) {
      console.error('Error downloading the CSV file:', error);
  }
};
