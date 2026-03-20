import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaCube, FaChartPie } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProductCategories = ({ isDark, products }) => {
  const { labels, percentages, backgroundColors } = useMemo(() => {
    if (!products || products.length === 0) {
      return {
        labels: ['No Data'],
        percentages: [100],
        backgroundColors: [isDark ? '#334155' : '#e2e8f0']
      };
    }

    const categoryCount = {};
    products.forEach(p => {
      const cat = p.category || 'Others';
      const formattedCat = cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
      categoryCount[formattedCat] = (categoryCount[formattedCat] || 0) + 1;
    });

    const sortedCategories = Object.entries(categoryCount).sort((a, b) => b[1] - a[1]);
    const totalProducts = products.length;

    const baseColors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
    let finalLabels = [];
    let finalPercentages = [];
    let finalColors = [];
    let othersCount = 0;

    sortedCategories.forEach((item, index) => {
      if (index < 5) {
        finalLabels.push(item[0]);
        finalPercentages.push(Math.round((item[1] / totalProducts) * 100));
        finalColors.push(baseColors[index % baseColors.length]);
      } else {
        othersCount += item[1];
      }
    });

    if (othersCount > 0) {
      finalLabels.push('Others');
      finalPercentages.push(Math.round((othersCount / totalProducts) * 100));
      finalColors.push('#6b7280');
    }

    return { labels: finalLabels, percentages: finalPercentages, backgroundColors: finalColors };
  }, [products]);

  const data = {
    labels: labels,
    datasets: [
      {
        data: percentages, 
        backgroundColor: backgroundColors,
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? '#1e293b' : '#ffffff',
        titleColor: isDark ? '#ffffff' : '#000000',
        bodyColor: isDark ? '#cbd5e1' : '#475569',
        borderColor: isDark ? '#334155' : '#e2e8f0',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return ` ${context.label}: ${context.parsed}%`;
          }
        }
      }
    },
  };

  return (
    <div className={`p-6 sm:p-8 rounded-3xl border transition-all h-full flex flex-col ${isDark ? 'bg-[#1e293b] border-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.3)]' : 'bg-white border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'}`}>
      <div className="flex items-center gap-3 mb-6">
        <FaCube className="text-purple-500 text-xl" />
        <h2 className={`text-xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Product Categories
        </h2>
      </div>
      
      {products && products.length > 0 ? (
        <>
          <div className="relative h-[250px] w-full flex-grow flex items-center justify-center">
            <Doughnut data={data} options={options} />
          </div>

          <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-8">
            {data.labels.map((label, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: data.datasets[0].backgroundColor[i] }}></span>
                <span className={`font-bold truncate ${isDark ? 'text-gray-300' : 'text-gray-600'}`} title={label}>{label}</span>
                <span className={`text-xs ml-auto ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>({data.datasets[0].data[i]}%)</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center opacity-50 space-y-4">
          <FaChartPie size={40} className={isDark ? "text-gray-700" : "text-gray-200"} />
          <p className={`text-sm font-bold ${isDark ? "text-gray-500" : "text-gray-400"}`}>No categories mapped.</p>
        </div>
      )}
    </div>
  );
};

export default ProductCategories;
