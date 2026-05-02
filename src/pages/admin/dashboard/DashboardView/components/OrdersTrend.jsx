import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { FaChartLine } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// 👉 Static defaults moved outside to prevent reference changes during parent re-renders
const DEFAULT_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DEFAULT_DATA = [120, 95, 145, 130, 105, 95, 85, 155, 168, 140, 160, 175];

function OrdersTrend({ isDark, labels, data }) {
  const chartData = useMemo(() => ({
    labels: labels || DEFAULT_LABELS,
    datasets: [
      {
        label: 'Orders',
        data: data && data.length > 0 ? data : DEFAULT_DATA,
        fill: false,
        borderColor: '#8b5cf6', // purple-500
        tension: 0.4, // smooth curve like the screenshot
        borderWidth: 3,
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  }), [labels, data]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? '#1e293b' : '#ffffff',
        titleColor: isDark ? '#ffffff' : '#000000',
        bodyColor: isDark ? '#cbd5e1' : '#475569',
        borderColor: isDark ? '#334155' : '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        boxPadding: 4,
      }
    },
    scales: {
      x: {
        grid: {
          color: isDark ? '#334155' : '#f1f5f9',
          drawBorder: false,
          borderDash: [5, 5],
        },
        ticks: { color: isDark ? '#64748b' : '#94a3b8', font: { size: 12, weight: 'bold' } }
      },
      y: {
        grid: {
          color: isDark ? '#334155' : '#f1f5f9',
          drawBorder: false,
          borderDash: [5, 5],
        },
        ticks: { color: isDark ? '#64748b' : '#94a3b8', font: { size: 12, weight: 'bold' }, padding: 10, stepSize: 45 }
      }
    }
  }), [isDark]);

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border transition-all w-full ${isDark ? 'bg-[#1a1f2e] border-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.3)]' : 'bg-white border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'}`}>
      <div className="flex items-center gap-3 mb-8">
        <FaChartLine className="text-purple-500 text-xl" />
        <h2 className={`text-xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Orders Trend Analysis
        </h2>
      </div>
      <div className="relative h-[300px] w-full">
        <Line options={chartOptions} data={chartData} />
      </div>
    </div>
  );
};

OrdersTrend.displayName = 'OrdersTrend';
export default React.memo(OrdersTrend);
