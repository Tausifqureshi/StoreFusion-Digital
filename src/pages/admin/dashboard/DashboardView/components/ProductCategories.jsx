import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaCube, FaChartPie } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend);

function ProductCategories({ isDark, products }) {
  const chartData = useMemo(() => {   
    // 👉 1. Products nahi hain → khali/default chart dikhao
    if (!products || products.length === 0) {    
      return {
        labels: ['No Data'],
        percentages: [100],
        backgroundColors: [isDark ? '#334155' : '#e2e8f0']
      };
    }
     
    const totalProducts = products.length;
    const baseColors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

    // 👉 2. reduce: har product ki category gino → result: { Electronics: 5, Clothing: 3 }
    // const categoryCountMap = products.reduce((acc, product) => {
    //   const cat = product.category || 'Others';
    //   const formattedCat = cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
    //   acc[formattedCat] = (acc[formattedCat] || 0) + 1; // pehle se hai → +1 karo, nahi hai → 1 se shuru karo
    //   return acc; 
    // }, {}); // {} = khali object, yahan se counting shuru hogi
    // 👉 Category counts — sales wale style me
    const categoryCountMap = {}; // khali object
    products.forEach(product => {
      // agar category nahi hai → 'Others'
      const cat = product.category || 'Others';
      // format: first letter capital, rest small + yaha puls nhi concating kar raha hai joind 
      const formattedCat = cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();

      // dynamic key use karke count add karo
      categoryCountMap[formattedCat] = (categoryCountMap[formattedCat] || 0) + 1;
    });

    // 👉 Output example: { Electronics: 5, Clothing: 3, Others: 2 }

    // 👉 3. Object → Array banao, phir sort karo: jis category me zyada products, wo upar
    const sortedCategories = Object.entries(categoryCountMap)
      .sort((a, b) => b[1] - a[1]); // b[1] - a[1] = descending order (bada pehle)

    // 👉 4. slice: pehli 5 categories nikalo → baaki sab "Others" me jayenge
    const top5Categories = sortedCategories.slice(0, 5);   // index 0–4 tak (Top 5)   
    const othersCategories = sortedCategories.slice(5);    // index 5 ke baad wale → Others
                         
    // 👉 5. reduce: baaki sab categories ka count jod ke ek 'Others' ka total banao
    const othersCount = othersCategories.reduce((sum, item) => sum + item[1], 0); // 0 = starting value

    // 👉 6. map: top 5 se naam, percentage, aur color alag alag arrays me nikalo
    const finalLabels = top5Categories.map(item => item[0]);                                      // category ka naam
    const finalPercentages = top5Categories.map(item => Math.round((item[1] / totalProducts) * 100)); // percentage calculate karo
    const finalColors = top5Categories.map((_, index) => baseColors[index % baseColors.length]); // har category ko ek color do

    // 👉 7. Agar 'Others' me kuch bache hain → array ke end me push kar do
    if (othersCount > 0) {                   
      finalLabels.push('Others');
      finalPercentages.push(Math.round((othersCount / totalProducts) * 100));
      finalColors.push('#6b7280'); // Others = grey color (fix)
    }

    return {
      labels: finalLabels,
      percentages: finalPercentages,
      backgroundColors: finalColors
    };
  }, [products, isDark]); // 👉 Dependency me isDark add kiya (bug fix) taaki jab dark mode badle to "No Data" color bhi badal jaye

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        data: chartData.percentages,
        backgroundColor: chartData.backgroundColors,
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
          label: function (context) {
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

ProductCategories.displayName = 'ProductCategories';
export default React.memo(ProductCategories);
