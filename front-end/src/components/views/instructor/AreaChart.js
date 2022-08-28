import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Students Count',
    },
  },
};

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max-min+1)) + min;
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      fill: false,
      label: 'Dataset 1',
    //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      data: labels.map(() => getRandomInt(0, 100)),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
        fill: false,
        label: 'Dataset 2',
      //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        data: labels.map(() => getRandomInt(0, 100)),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
  ],
};

export function AreaChart() {
  return <Line options={options} data={data} />;
}

export default AreaChart;