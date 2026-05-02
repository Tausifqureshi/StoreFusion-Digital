import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function RevenueTrend({ isDark, data }) {
  const chartData = useMemo(() => ({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: data || Array(12).fill(0),
        fill: false,
        borderColor: '#10b981', // green-500
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
      },
    ],
  }), [data]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { color: isDark ? '#64748b' : '#94a3b8', font: { size: 10 } }
      },
      y: {
        grid: {
          color: isDark ? '#334155' : '#f1f5f9',
          drawBorder: false,
          borderDash: [5, 5],
        },
        ticks: { color: isDark ? '#64748b' : '#94a3b8', font: { size: 10 } }
      }
    }
  }), [isDark]);

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border transition-all h-full ${isDark ? 'bg-[#1a1f2e] border-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.3)]' : 'bg-white border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'}`}>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-green-500 text-xl font-black">$</span>
        <h2 className={`text-lg font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Revenue Trend
        </h2>
      </div>
      <div className="relative h-[250px] w-full">
        <Line options={chartOptions} data={chartData} />
      </div>
    </div>
  );
};

RevenueTrend.displayName = 'RevenueTrend';
export default React.memo(RevenueTrend);
