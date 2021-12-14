import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

//types
import { FirestoreProjection } from '../../types/Firestore';

//utils
import getRandomColor from '../../utils/getRandomColor';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart = ({
  projections,
  sprintOptions,
  title,
}: {
  projections: FirestoreProjection[];
  sprintOptions: string[];
  title: string;
}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
        min: 0,
        ticks: {
          // forces step size to be 1 units
          stepSize: 1,
        },
      },
    },
  };

  const labels = projections.map((projection) => projection.date);

  const datasets = sprintOptions.map((option) => {
    const data = projections.map((projection) => projection.data[option]);
    const color = getRandomColor();
    return {
      label: option,
      data,
      borderColor: color,
      backgroundColor: color,
    };
  });
  const data = {
    labels,
    datasets,
  };

  return <Line options={options} data={data} />;
};
