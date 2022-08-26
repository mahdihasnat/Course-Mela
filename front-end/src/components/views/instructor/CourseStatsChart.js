import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Stack } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// const getRandomInt = (min, max) => {
//     min = Math.ceil(min);
//     max = Math.ceil(max);
//     return Math.floor(Math.random() * (max-min+1)) + min;
// }

function CourseStatsChart({ chartTitle, labels, dataVals, datasetName, backRgb }) {

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: chartTitle,
            font: {
                size: 20
            }
          },
        },
      };

    const data = {
        labels,
        datasets: [
          {
            label: datasetName,
            data: dataVals,
            backgroundColor: backRgb,
          },
        //   {
        //     label: 'Dataset 2',
        //     data: labels.map(() => getRandomInt(0, 100)),
        //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
        //   },
        ],
      };

    return (
        <Bar options={options} data={data} />
    );
}

export default CourseStatsChart;
