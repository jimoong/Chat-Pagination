import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartArtifact = ({ chartType, data, options = {} }) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: chartType === 'doughnut',
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: '#000',
        titleFont: {
          size: 13,
        },
        bodyFont: {
          size: 12,
        },
        padding: 12,
        cornerRadius: 6,
      },
    },
    scales: chartType !== 'doughnut' ? {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: '#e5e5e5',
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
    } : undefined,
    ...options,
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <Bar data={data} options={defaultOptions} />;
      case 'line':
        return <Line data={data} options={defaultOptions} />;
      case 'doughnut':
        return <Doughnut data={data} options={defaultOptions} />;
      default:
        return <Bar data={data} options={defaultOptions} />;
    }
  };

  return <div className="chart-artifact">{renderChart()}</div>;
};

export default ChartArtifact;

