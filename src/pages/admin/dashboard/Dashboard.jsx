// import React, { useContext } from 'react';
// import { FaBox, FaShoppingCart, FaUsers, FaTag } from 'react-icons/fa';
// import { MyContext } from '../../../context api/myContext';
// import Layout from '../../../components/layout/Layout';
// import DashboardTab from './DashboardTab';
// import ScrollToTopButoon from '../../../components/Scroll top/ScrollToTopButoon';

// function Dashboard() {
//   const { mode } = useContext(MyContext);

//   const cardStyle = {
//     backgroundColor: mode === 'dark' ? 'rgba(46, 49, 55, 0.7)' : 'rgba(255, 255, 255, 0.6)',
//     color: mode === 'dark' ? '#fff' : '#000',
//     border: '1px solid rgba(255, 255, 255, 0.1)',
//     backdropFilter: 'blur(10px)',
//     boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
//     transition: 'transform 0.3s ease-in-out',
//   };

//   const stats = [
//     { title: 'Total Products', value: 10, icon: <FaBox /> },
//     { title: 'Total Orders', value: 15, icon: <FaShoppingCart /> },
//     { title: 'Total Users', value: 20, icon: <FaUsers /> },
//     { title: 'New Discounts', value: 5, icon: <FaTag /> },
//   ]; 

//   return (
//     <Layout>
//       <div className="dashboard-container px-5 py-10">
//         <h1 className="text-4xl font-extrabold text-center mb-10">
//           Dashboard Overview
//         </h1>
//         <section className="text-gray-600 body-font">
//           <div className="container mx-auto">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//               {stats.map((item, index) => (
//                 <div
//                   key={index}
//                   className="card p-6 rounded-lg transform hover:scale-105 transition-all duration-300"
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
//           </div>

//           <DashboardTab />
//         </section>
//       </div>
//       <ScrollToTopButoon />
//     </Layout>
//   );
// }  

// export default Dashboard;




















import React, { useContext } from 'react';
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
  const { mode } = useContext(MyContext);

  const cardStyle = {
    backgroundColor: mode === 'dark' ? '#343a40' : '#ffffff',
    color: mode === 'dark' ? '#ffffff' : '#000000',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  };

  const stats = [
    { title: 'Total Products', value: 100, icon: <FaBox />, bgColor: 'bg-purple-100' },
    { title: 'Total Orders', value: 200, icon: <FaShoppingCart />, bgColor: 'bg-blue-100' },
    { title: 'Total Users', value: 150, icon: <FaUsers />, bgColor: 'bg-green-100' },
    { title: 'New Discounts', value: 30, icon: <FaTag />, bgColor: 'bg-yellow-100' },
  ];

  // Sample data for charts - Full year
  const lineChartData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 
      'June', 'July', 'August', 'September', 'October', 
      'November', 'December'
    ],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [300, 400, 350, 500, 600, 700, 800, 750, 900, 950, 1100, 1200],
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
      'January', 'February', 'March', 'April', 'May', 
      'June', 'July', 'August', 'September', 'October', 
      'November', 'December'
    ],
    datasets: [
      {
        label: 'Sales Performance',
        data: [300, 400, 350, 500, 600, 700, 800, 750, 900, 950, 1100, 1200],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales and Orders Overview (2024)',
        font: {
          size: 18,
          weight: 'bold',
        },
      },
    },
  };

  return (
    <Layout>
      <div className="dashboard-container px-5 py-10">
        <h1 className="text-4xl font-extrabold text-center mb-10">
          Dashboard Overview
        </h1>
        <section className="text-gray-600 body-font">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className={`card p-6 rounded-lg transform hover:scale-105 transition-all duration-300 ${item.bgColor}`}
                  style={cardStyle}
                >
                  <div className="icon mb-4 text-5xl text-purple-500">
                    {item.icon}
                  </div>
                  <h2
                    className="text-5xl font-bold mb-2"
                    style={{ color: mode === 'dark' ? '#fff' : '#333' }}
                  >
                    {item.value}
                  </h2>
                  <p
                    className="text-xl font-medium tracking-wide"
                    style={{ color: mode === 'dark' ? '#9ca3af' : '#6b7280' }}
                  >
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Monthly Sales Overview</h2>
                <Line options={chartOptions} data={lineChartData} />
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Sales Performance</h2>
                <Bar options={chartOptions} data={barChartData} />
              </div>
            </div>

            <DashboardTab />
          </div>
        </section>
      </div>
      <ScrollToTopButton />
    </Layout>
  );
}

export default Dashboard;









