// components/PieChart.js
"use client"; // Mark this component as a Client Component

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
} from 'chart.js';

// Register the required components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale
);

const PieChart = ({ data }) => {


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
     
    },
  };

  return (
    <div className='m-0 p-0'>
      
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default PieChart;
