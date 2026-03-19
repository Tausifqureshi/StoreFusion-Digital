import React, { useContext, useState, useEffect } from 'react';
import { FaBox, FaShoppingCart, FaUsers, FaTag } from 'react-icons/fa';
import { MyContext } from '../../../context api/myContext';
import Layout from '../../../components/layout/Layout';
import DashboardTab from './DashboardTab';
import ScrollToTopButton from '../../../components/Scroll top/ScrollToTopButoon';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register required components with Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);
function Dashboard() {
  const { mode, product, order, user } = useContext(MyContext);
  const isDark = mode === 'dark';

  const [monthlyOrders, setMonthlyOrders] = useState(Array(12).fill(0));
  const [monthlyRevenue, setMonthlyRevenue] = useState(Array(12).fill(0));


  useEffect(() => {

    // 👉 agar order empty hai ya undefined hai to kuch mat karo
    if (!order || order.length === 0) return;

    // 👉 12 months ke liye array bana rahe hain (Jan–Dec)
    // har index ek month ko represent karega (0 = Jan, 11 = Dec)
    const ordersCount = Array(12).fill(0);   // orders count store karega
    const revenueAcc = Array(12).fill(0);    // revenue store karega

    // 👉 har order pe loop chala rahe hain
    order.forEach((item) => {

      // 👉 order ki date nikal rahe hain
      // agar item.date hai to use karo, warna createdAt use karo
      const date = new Date(item.date || item.createdAt);

      // 👉 agar date invalid hai to us order ko skip karo
      if (isNaN(date)) return;

      // 👉 month nikal rahe hain (0 = Jan, 1 = Feb ... 11 = Dec)
      const month = date.getMonth();

      // 👉 us month ke index pe order count +1 kar rahe hain
      ordersCount[month]++;

      // 👉 amount nikal rahe hain (jo bhi field available ho)
      const amount = Number(
        item.grandTotal || item.totalAmount || item.price || 0
      );

      // 👉 us month me revenue add kar rahe hain
      revenueAcc[month] += amount; //revenueAcc[month] += amount ka matlab hai — us month ke box me amount add kar do
    });

    // 👉 final calculated data state me save kar rahe hain
    setMonthlyOrders(ordersCount);   // chart ke liye orders data
    setMonthlyRevenue(revenueAcc);   // chart ke liye revenue data

    // 👉 ye code sirf tab chalega jab "order" change hoga
  }, [order]);


  const cardStyle = {
    backgroundColor: isDark ? '#1e293b' : '#ffffff',
    color: isDark ? '#ffffff' : '#000000',
    border: isDark ? '1px solid #1f2937' : '1px solid rgba(0, 0, 0, 0.05)',
    backdropFilter: 'blur(10px)',
    boxShadow: isDark ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const stats = [
    {
      title: "Total Products",
      value: product?.length || 0,
      icon: <FaBox />,
      bgColor: "bg-purple-100",
    },
    {
      title: "Total Orders",
      value: order?.length || 0,
      icon: <FaShoppingCart />,
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Users",
      value: user?.length || 0,
      icon: <FaUsers />,
      bgColor: "bg-green-100",
    },
    {
      title: "New Discounts",
      value: product?.filter(p => p.discount)?.length || 0,
      icon: <FaTag />,
      bgColor: "bg-yellow-100",
    },
  ];

  // Sample data for charts - Full year
  const lineChartData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Monthly Sales',
        data: monthlyOrders,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
        borderWidth: 2,
      },
    ],
  };

  const barChartData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Sales Performance',
        data: monthlyRevenue,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Sales and Orders Overview (${new Date().getFullYear()})`,
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          minRotation: 0,
          autoSkip: false,
          font: {
            size: 10
          }
        }
      }
    }
  };

  return (
    <Layout>
      <div className={`min-h-screen pt-28 pb-12 transition-all duration-300 ${isDark ? "bg-[#131921] text-white" : "bg-[#f4f6f8] text-gray-900"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${isDark ? "text-blue-500" : "text-blue-600"}`}>
                Overview
              </p>
              <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                STOREFUSION <span className="text-orange-500 font-light">Admin</span>
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center gap-2 border shadow-sm ${isDark ? "bg-gray-800 border-gray-700 text-gray-300" : "bg-white border-gray-200 text-gray-600"}`}>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                </span>
                System Live
              </div>
            </div>
          </div>

          <section className={`body-font ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${isDark ? 'bg-[#1e293b] border-gray-800 hover:border-blue-500/30' : 'bg-white border-gray-200 hover:border-blue-200 shadow-sm hover:shadow-md'
                    }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <p className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.title}
                    </p>
                    <div className={`w-10 h-10 flex items-center justify-center rounded-lg text-lg ${item.bgColor} ${isDark ? 'mix-blend-lighten opacity-80' : ''}`}>
                      <div className="text-blue-600 drop-shadow-sm">{item.icon}</div>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <h2 className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {item.value}
                    </h2>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Sales Chart */}
              <div className={`rounded-2xl border flex flex-col transition-all ${isDark ? 'bg-[#1e293b] border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                <div className="p-5 border-b dark:border-gray-800">
                  <h2 className={`text-sm font-bold tracking-widest uppercase flex items-center gap-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
                    Monthly Sales Trend
                  </h2>
                </div>
                <div className="p-4 sm:p-6 w-full overflow-x-auto custom-scrollbar">
                  <div className="relative h-[280px] sm:h-[350px] min-w-[500px]">
                    <Line options={chartOptions} data={lineChartData} />
                  </div>
                </div>
              </div>

              {/* Performance Chart */}
              <div className={`rounded-2xl border flex flex-col transition-all ${isDark ? 'bg-[#1e293b] border-gray-800' : 'bg-white border-gray-200 shadow-sm'}`}>
                <div className="p-5 border-b dark:border-gray-800">
                  <h2 className={`text-sm font-bold tracking-widest uppercase flex items-center gap-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div>
                    Sales Performance
                  </h2>
                </div>
                <div className="p-4 sm:p-6 w-full overflow-x-auto custom-scrollbar">
                  <div className="relative h-[280px] sm:h-[350px] min-w-[500px]">
                    <Bar options={chartOptions} data={barChartData} />
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs List / Table Data */}
            <div className={`rounded-2xl border transition-all overflow-hidden ${isDark ? "bg-[#1e293b] border-gray-800" : "bg-white border-gray-200 shadow-sm"}`}>
              <DashboardTab />
            </div>

          </section>
        </div>
      </div>
      <ScrollToTopButton />
    </Layout>
  );
}

export default Dashboard;
