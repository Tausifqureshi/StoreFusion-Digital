// import React, { useContext } from 'react';
// import { FaBox, FaShoppingCart, FaUsers, FaTag } from 'react-icons/fa';
// import { MyContext } from '../../../context api/myContext';
// import Layout from '../../../components/layout/Layout';
// import DashboardTab from './DashboardTab';

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
//     </Layout>
//   );
// }  

// export default Dashboard;




import React, { useContext } from 'react';
import { FaBox, FaShoppingCart, FaUsers, FaTag } from 'react-icons/fa';
import { MyContext } from '../../../context api/myContext';
import Layout from '../../../components/layout/Layout';
import DashboardTab from './DashboardTab';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

function Dashboard() {
  const { mode } = useContext(MyContext);

  const cardStyle = {
    backgroundColor: mode === 'dark' ? 'rgba(30, 32, 36, 0.9)' : 'rgba(255, 255, 255, 0.9)',
    color: mode === 'dark' ? '#fff' : '#000',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    transition: 'transform 0.3s ease-in-out',
  };

  const stats = [
    { title: 'Total Products', value: 10, icon: <FaBox /> },
    { title: 'Total Orders', value: 15, icon: <FaShoppingCart /> },
    { title: 'Total Users', value: 20, icon: <FaUsers /> },
    { title: 'New Discounts', value: 5, icon: <FaTag /> },
  ];

  // Sample data for the bar chart (Monthly Sales)
  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3, 15, 20, 30, 25, 35, 40],
        backgroundColor: mode === 'dark' ? 'rgba(75, 192, 192, 0.6)' : 'rgba(75, 192, 192, 1)',
        borderColor: mode === 'dark' ? 'rgba(75, 192, 192, 1)' : 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Sample data for the line chart (Yearly Sales Overview)
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Sales',
        data: [30, 45, 25, 50, 35, 55, 40, 60, 70, 80, 90, 100],
        backgroundColor: mode === 'dark' ? 'rgba(153, 102, 255, 0.6)' : 'rgba(153, 102, 255, 1)',
        borderColor: mode === 'dark' ? 'rgba(153, 102, 255, 1)' : 'rgba(153, 102, 255, 1)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return (
    <Layout>
      <div className="dashboard-container px-5 py-10">
        <h1 className="text-4xl font-extrabold text-center mb-10">Dashboard Overview</h1>
        <section className="text-gray-600 body-font">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
              {stats.map((item, index) => (
                <div
                  key={index}
                  className="card p-6 rounded-lg transform hover:scale-105 transition-all duration-300"
                  style={cardStyle}
                >
                  <div className="icon mb-4 text-5xl text-purple-500">{item.icon}</div>
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

            {/* Flexbox layout for charts */}
            <div className="flex flex-col md:flex-row gap-10">
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">Monthly Sales Overview</h2>
                <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">Sales Trend (Yearly Overview)</h2>
                <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            <DashboardTab />
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default Dashboard;
