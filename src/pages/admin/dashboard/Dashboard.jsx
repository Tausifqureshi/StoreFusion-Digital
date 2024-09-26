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
