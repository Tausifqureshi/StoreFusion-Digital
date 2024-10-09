import React, { useContext } from 'react';
import { FaBox, FaShoppingCart, FaUsers, FaTag } from 'react-icons/fa';
import { MyContext } from '../../../context api/myContext';
import Layout from '../../../components/layout/Layout';
import DashboardTab from './DashboardTab';

function Dashboard() {
  const { mode } = useContext(MyContext);

  const cardStyle = {
    backgroundColor: mode === 'dark' ? 'rgba(46, 49, 55, 0.7)' : 'rgba(255, 255, 255, 0.6)',
    color: mode === 'dark' ? '#fff' : '#000',
    border: '1px solid rgba(255, 255, 255, 0.1)',
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
                  className="card p-6 rounded-lg transform hover:scale-105 transition-all duration-300"
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
          </div>

          <DashboardTab />
        </section>
      </div>
    </Layout>
  );
}  

export default Dashboard;





// import React, { useContext } from 'react';
// import { FaBox, FaShoppingCart, FaUsers, FaTag } from 'react-icons/fa';
// import { MyContext } from '../../../context api/myContext';
// import Layout from '../../../components/layout/Layout';
// import DashboardTab from './DashboardTab';
// import Chart from 'react-apexcharts';

// function Dashboard() {
//   const { mode } = useContext(MyContext);

//   // Styles for cards and container
//   const cardStyle = {
//     backgroundColor: mode === 'dark' ? '#1F1F1F' : '#ffffff',
//     color: mode === 'dark' ? '#ffffff' : '#333333',
//     borderRadius: '15px',
//     boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
//     padding: '20px',
//     transition: 'transform 0.3s, box-shadow 0.3s',
//   };

//   const stats = [
//     { title: 'Total Products', value: 10, icon: <FaBox /> },
//     { title: 'Total Orders', value: 15, icon: <FaShoppingCart /> },
//     { title: 'Total Users', value: 20, icon: <FaUsers /> },
//     { title: 'New Discounts', value: 5, icon: <FaTag /> },
//   ];

//   // Line Chart Data
//   const lineChartOptions = {
//     chart: {
//       id: 'sales-data',
//       toolbar: { show: false },
//       zoom: { enabled: false },
//       background: 'transparent',
//     },
//     xaxis: {
//       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//       labels: {
//         style: {
//           colors: mode === 'dark' ? '#ffffff' : '#333333',
//         },
//       },
//     },
//     stroke: {
//       curve: 'smooth',
//       width: 2,
//     },
//     colors: ['#4F46E5'],
//     markers: {
//       size: 5,
//     },
//   };

//   const lineChartSeries = [
//     {
//       name: 'Sales',
//       data: [30, 40, 35, 50, 49, 60, 70, 80, 75, 90, 100, 110],
//     },
//   ];

//   // Bar Chart Data
//   const barChartOptions = {
//     chart: {
//       id: 'order-data',
//       toolbar: { show: false },
//       zoom: { enabled: false },
//       background: 'transparent',
//     },
//     xaxis: {
//       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//       labels: {
//         style: {
//           colors: mode === 'dark' ? '#ffffff' : '#333333',
//         },
//       },
//     },
//     plotOptions: {
//       bar: {
//         borderRadius: 8,
//         horizontal: false,
//       },
//     },
//     colors: ['#9333EA'],
//   };

//   const barChartSeries = [
//     {
//       name: 'Orders',
//       data: [20, 30, 25, 40, 35, 50, 60, 70, 65, 80, 90, 100],
//     },
//   ];

//   return (
//     <Layout>
//       <div className="dashboard-container px-10 py-8">
//         <h1 className="text-4xl font-bold text-center mb-6 text-purple-600">Dashboard Overview</h1>

//         <section className="text-gray-700">
//           <div className="container mx-auto">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
//               {stats.map((item, index) => (
//                 <div
//                   key={index}
//                   className="transform hover:scale-105 transition-all duration-300"
//                   style={cardStyle}
//                 >
//                   <div className="flex items-center mb-4">
//                     <div className="icon text-4xl text-purple-500 mr-4">
//                       {item.icon}
//                     </div>
//                     <div>
//                       <h2 className="text-4xl font-bold">{item.value}</h2>
//                       <p className="text-lg font-medium">{item.title}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Chart Section */}
//             <h2 className="text-2xl font-semibold mb-4">Sales & Orders Overview</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="bg-white rounded-lg shadow-lg p-5">
//                 <Chart options={lineChartOptions} series={lineChartSeries} type="line" height={350} />
//               </div>
//               <div className="bg-white rounded-lg shadow-lg p-5">
//                 <Chart options={barChartOptions} series={barChartSeries} type="bar" height={350} />
//               </div>
//             </div>

//             <DashboardTab />
//           </div>
//         </section>
//       </div>
//     </Layout>
//   );
// }

// export default Dashboard;
