// import React, { useContext } from 'react';
// import { FaBox, FaShoppingCart, FaUsers, FaTag } from 'react-icons/fa';
// import { MyContext } from '../../../context api/myContext';
// import Layout from '../../../components/layout/Layout';
// import DashboardTab from './DashboardTab';
// import ScrollToTopButton from '../../../components/Scroll top/ScrollToTopButoon';
// import { Line, Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// // Register required components with Chart.js
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);
// function Dashboard() {
//   const { mode,product,order, user, } = useContext(MyContext);

//   const cardStyle = {
//     backgroundColor: mode === 'dark' ? '#343a40' : '#ffffff',
//     color: mode === 'dark' ? '#ffffff' : '#000000',
//     border: '1px solid rgba(255, 255, 255, 0.1)',
//     backdropFilter: 'blur(10px)',
//     boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
//     transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//   };

//   // Updated stats with increased product count
//   // const stats = [
//   //   { title: 'Total Products', value: 1000, icon: <FaBox />, bgColor: 'bg-purple-100' },
//   //   { title: 'Total Orders', value: 500, icon: <FaShoppingCart />, bgColor: 'bg-blue-100' },
//   //   { title: 'Total Users', value: 1500, icon: <FaUsers />, bgColor: 'bg-green-100' },
//   //   { title: 'New Discounts', value: 30, icon: <FaTag />, bgColor: 'bg-yellow-100' },
//   // ];
//   const stats = [
//   {
//     title: "Total Products",
//     value: product?.length || 0,
//     icon: <FaBox />,
//     bgColor: "bg-purple-100",
//   },
//   {
//     title: "Total Orders",
//     value: order?.length || 0,
//     icon: <FaShoppingCart />,
//     bgColor: "bg-blue-100",
//   },
//   {
//     title: "Total Users",
//     value: user?.length || 0,
//     icon: <FaUsers />,
//     bgColor: "bg-green-100",
//   },
//   {
//     title: "New Discounts",
//     value: product?.filter(p => p.discount)?.length || 0,
//     icon: <FaTag />,
//     bgColor: "bg-yellow-100",
//   },
// ];

//   // Sample data for charts - Full year
//   const lineChartData = {
//     labels: [
//       'January', 'February', 'March', 'April', 'May', 
//       'June', 'July', 'August', 'September', 'October', 
//       'November', 'December'
//     ],
//     datasets: [
//       {
//         label: 'Monthly Sales',
//         data: [300, 400, 350, 500, 600, 700, 800, 750, 900, 950, 1100, 1200],
//         fill: true,
//         backgroundColor: 'rgba(75, 192, 192, 0.4)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         tension: 0.4,
//         borderWidth: 2,
//       },
//     ],
//   };

//   const barChartData = {
//     labels: [
//       'January', 'February', 'March', 'April', 'May', 
//       'June', 'July', 'August', 'September', 'October', 
//       'November', 'December'
//     ],
//     datasets: [
//       {
//         label: 'Sales Performance',
//         data: [300, 400, 350, 500, 600, 700, 800, 750, 900, 950, 1100, 1200],
//         backgroundColor: 'rgba(153, 102, 255, 0.6)',
//         borderColor: 'rgba(153, 102, 255, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Sales and Orders Overview (2025)',
//         font: {
//           size: 18,
//           weight: 'bold',
//         },
//       },
//     },
//   };

//   return (
//     <Layout>
//       <div className="dashboard-container px-5 py-10 bg-gray-100 min-h-screen">
//         <h1 className="text-4xl font-extrabold text-center mb-10">
//           Admin Dashboard Overview
//         </h1>
//         <section className="text-gray-600 body-font">
//           <div className="container mx-auto">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
//               {stats.map((item, index) => (
//                 <div
//                   key={index}
//                   className={`card p-6 rounded-lg transform hover:scale-105 transition-all duration-300 ${item.bgColor}`}
//                   style={cardStyle}
//                 >
//                   <div className="icon mb-4 text-5xl text-purple-500">
//                     {item.icon}
//                   </div>
//                   <h2
//                     className="text-5xl font-bold mb-2"
//                     style={{ color: mode === 'dark' ? '#fff' : '#333' }}
//                   >
//                     {item.value}
//                   </h2>
//                   <p
//                     className="text-xl font-medium tracking-wide"
//                     style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}
//                   >
//                     {item.title}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             {/* Charts Section */}
//             <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div className="bg-white shadow-lg rounded-lg p-6">
//                 <h2 className="text-xl font-bold mb-4">Monthly Sales Overview</h2>
//                 <Line options={chartOptions} data={lineChartData} />
//               </div>
//               <div className="bg-white shadow-lg rounded-lg p-6">
//                 <h2 className="text-xl font-bold mb-4">Sales Performance</h2>
//                 <Bar options={chartOptions} data={barChartData} />
//               </div>
//             </div>

//             <DashboardTab />
//           </div>
//         </section>
//       </div>
//       <ScrollToTopButton />
//     </Layout>
//   );
// }

// export default Dashboard;


import React, { useContext, useMemo } from "react";
import { FaBox, FaShoppingCart, FaUsers, FaTag, FaStar } from "react-icons/fa";
import { MyContext } from "../../../context api/myContext";
import Layout from "../../../components/layout/Layout";
import DashboardTab from "./DashboardTab";
import ScrollToTopButton from "../../../components/Scroll top/ScrollToTopButoon";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const { mode, product, order, user, testimonial } = useContext(MyContext);

  /* ✅ Memo Stats (production optimization) */
  const stats = useMemo(() => {
    return [
      {
        title: "Total Products",
        value: product?.length || 0,
        icon: <FaBox />,
        color: "from-purple-500 to-indigo-500",
      },
      {
        title: "Total Orders",
        value: order?.length || 0,
        icon: <FaShoppingCart />,
        color: "from-blue-500 to-cyan-500",
      },
      {
        title: "Total Users",
        value: user?.length || 0,
        icon: <FaUsers />,
        color: "from-green-500 to-emerald-500",
      },
      {
        title: "Discount Products",
        value: product?.filter((p) => Number(p.discount) > 0)?.length || 0,
        icon: <FaTag />,
        color: "from-yellow-500 to-orange-500",
      },
      {
        title: "Testimonials",
        value: testimonial?.length || 0,
        icon: <FaStar />,
        color: "from-pink-500 to-rose-500",
      },
    ];
  }, [product, order, user, testimonial]);

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <Layout>
      <div className="px-6 py-10 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-10">
          Admin Dashboard
        </h1>

        {/* ✅ Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
          {stats.map((item, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl shadow-lg text-white bg-gradient-to-r ${item.color} hover:scale-105 transition`}
            >
              <div className="text-4xl mb-2">{item.icon}</div>
              <h2 className="text-3xl font-bold">{item.value}</h2>
              <p className="opacity-90">{item.title}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow">
            <Line
              options={chartOptions}
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                datasets: [
                  {
                    label: "Orders",
                    data: [12, 19, 8, 15, 22],
                    borderColor: "purple",
                  },
                ],
              }}
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <Bar
              options={chartOptions}
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                datasets: [
                  {
                    label: "Sales",
                    data: [10, 25, 14, 30, 40],
                    backgroundColor: "orange",
                  },
                ],
              }}
            />
          </div>
        </div>

        <DashboardTab />
      </div>

      <ScrollToTopButton />
    </Layout>
  );
}

export default Dashboard;


// import React, { useContext, useMemo } from "react";
// import { FaBox, FaShoppingCart, FaUsers, FaTag } from "react-icons/fa";
// import { MyContext } from "../../../context api/myContext";
// import Layout from "../../../components/layout/Layout";
// import DashboardTab from "./DashboardTab";
// import ScrollToTopButton from "../../../components/Scroll top/ScrollToTopButoon";
// import { Line, Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function Dashboard() {
//   const { mode, product = [], order = [], user = [] } = useContext(MyContext);

//   const cardStyle = {
//     backgroundColor: mode === "dark" ? "#343a40" : "#ffffff",
//     color: mode === "dark" ? "#ffffff" : "#000000",
//     boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
//   };

//   // ✅ Dynamic Stats
//   const stats = [
//     { title: "Total Products", value: product.length, icon: <FaBox />, bgColor: "bg-purple-100" },
//     { title: "Total Orders", value: order.length, icon: <FaShoppingCart />, bgColor: "bg-blue-100" },
//     { title: "Total Users", value: user.length, icon: <FaUsers />, bgColor: "bg-green-100" },
//     {
//       title: "Discount Products",
//       value: product.filter((p) => p.discount).length,
//       icon: <FaTag />,
//       bgColor: "bg-yellow-100",
//     },
//   ];

//   // ✅ Monthly Revenue Logic
//   const monthlyRevenue = useMemo(() => {
//     const months = new Array(12).fill(0);

//     order.forEach((o) => {
//       const date = o.createdAt ? new Date(o.createdAt) : new Date();
//       const month = date.getMonth();
//       months[month] += Number(o.totalAmount || 0);
//     });

//     return months;
//   }, [order]);

//   const monthsLabel = [
//     "Jan","Feb","Mar","Apr","May","Jun",
//     "Jul","Aug","Sep","Oct","Nov","Dec",
//   ];

//   // ✅ Line Chart
//   const lineChartData = {
//     labels: monthsLabel,
//     datasets: [
//       {
//         label: "Revenue",
//         data: monthlyRevenue,
//         fill: true,
//         backgroundColor: "rgba(75,192,192,0.3)",
//         borderColor: "rgba(75,192,192,1)",
//         tension: 0.4,
//       },
//     ],
//   };

//   // ✅ Category Count Bar Chart
//   const categoryData = useMemo(() => {
//     const map = {};
//     product.forEach((p) => {
//       map[p.category] = (map[p.category] || 0) + 1;
//     });
//     return map;
//   }, [product]);

//   const barChartData = {
//     labels: Object.keys(categoryData),
//     datasets: [
//       {
//         label: "Products",
//         data: Object.values(categoryData),
//         backgroundColor: "rgba(153,102,255,0.6)",
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//     },
//   };

//   return (
//     <Layout>
//       <div className="px-5 py-10 bg-gray-100 min-h-screen">
//         <h1 className="text-4xl font-extrabold text-center mb-10">
//           Admin Dashboard Overview
//         </h1>

//         {/* ✅ Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
//           {stats.map((item, i) => (
//             <div key={i} className={`p-6 rounded-lg hover:scale-105 ${item.bgColor}`} style={cardStyle}>
//               <div className="text-5xl mb-3 text-purple-500">{item.icon}</div>
//               <h2 className="text-4xl font-bold">{item.value}</h2>
//               <p className="text-lg">{item.title}</p>
//             </div>
//           ))}
//         </div>

//         {/* ✅ Charts */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div className="bg-white p-6 rounded shadow">
//             <h2 className="font-bold mb-3">Monthly Revenue</h2>
//             <Line data={lineChartData} options={chartOptions} />
//           </div>

//           <div className="bg-white p-6 rounded shadow">
//             <h2 className="font-bold mb-3">Category Products</h2>
//             <Bar data={barChartData} options={chartOptions} />
//           </div>
//         </div>

//         <DashboardTab />
//       </div>

//       <ScrollToTopButton />
//     </Layout>
//   );
// }

// export default Dashboard;