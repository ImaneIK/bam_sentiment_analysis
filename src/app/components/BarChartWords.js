"use client"; // Mark this component as a Client Component

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

// Register the required components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const BarChartWords = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: true,
        text: 'Most Common Words',
      },
    },
  };

  return (
   
      <Bar className="h-full w-full" data={data} options={options} />
    
  );
};

export default BarChartWords;
