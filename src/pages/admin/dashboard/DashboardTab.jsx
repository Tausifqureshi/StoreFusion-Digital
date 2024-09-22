import React, { useContext, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { MyContext } from '../../../context api/myContext';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { FaUser, FaCartPlus } from 'react-icons/fa';
import { AiFillShopping, AiFillPlusCircle, AiFillDelete } from 'react-icons/ai';
import { useSpring, animated } from 'react-spring';

function DashboardTab() {
  const { mode } = useContext(MyContext);
  const [index, setIndex] = useState(0); // Track the current tab index

  // Animation for tab panel
  const animationProps = useSpring({
    opacity: 1,
    transform: `translateY(0)`,
    from: { opacity: 0, transform: `translateY(20px)` },
    reset: true,
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <Tabs selectedIndex={index} onSelect={(newIndex) => setIndex(newIndex)} className="space-y-8">
       {/* NewIndex ye bye-defulat browswe pass karta hai na event ohi hai bus is me ham event name ki jaga newIndex kar re hai hamri marzi koi bhi name le sakte hai ham */}
 
        {/* Tab List with modern design */}
        <TabList className="flex justify-center space-x-10 mb-10">
          {[
            { icon: <MdOutlineProductionQuantityLimits size={32} />, label: 'Products', color: 'text-indigo-600', hoverColor: 'hover:text-indigo-800' },
            { icon: <AiFillShopping size={32} />, label: 'Orders', color: 'text-blue-600', hoverColor: 'hover:text-blue-800' },
            { icon: <FaUser size={32} />, label: 'Users', color: 'text-green-600', hoverColor: 'hover:text-green-800' },
          ].map((tab, index) => (
            <Tab key={index} className={`cursor-pointer text-lg font-semibold ${tab.color} ${tab.hoverColor} transition-all`}>
              <div className="flex items-center space-x-3">
                {tab.icon}
                <span>{tab.label}</span>
              </div>
            </Tab>
          ))}
        </TabList>

        {/* Product Tab */}
        <TabPanel>
          <animated.div style={animationProps} className="mb-12">
            <h1 className={`text-center text-4xl font-bold ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}>Product Details</h1>
            <div className="flex justify-end my-6">
              <button
                type="button"
                className={`flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white px-6 py-3 rounded-full shadow-lg transform transition hover:scale-105 duration-200 ease-in-out ${mode === 'dark' ? 'bg-gray-800' : ''}`}
              >
                Add Product <FaCartPlus size={24} />
              </button>
            </div>
            <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
              <table className="w-full text-sm text-left font-semibold">
                <thead className={`text-xs uppercase bg-gray-50 ${mode === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-700'}`}>
                  <tr>
                    {['S.No', 'Image', 'Title', 'Price', 'Category', 'Date', 'Action'].map((header, index) => (
                      <th key={index} className="px-6 py-4">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className={`border-b ${mode === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} hover:bg-gray-100`}>
                    <td className="px-6 py-4">1.</td>
                    <td className="px-6 py-4">
                      <img className="w-16 rounded-lg" src="https://dummyimage.com/720x400" alt="img" />
                    </td>
                    <td className="px-6 py-4">Title</td>
                    <td className="px-6 py-4">₹100</td>
                    <td className="px-6 py-4">Pots</td>
                    <td className="px-6 py-4">12 Aug 2019</td>
                    <td className="px-6 py-4 flex space-x-4">
                      <AiFillPlusCircle className="text-green-600 cursor-pointer" size={28} />
                      <AiFillDelete className="text-red-600 cursor-pointer hover:text-red-800 transition duration-150" size={28} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </animated.div>
        </TabPanel>

        {/* Order Tab */}
        <TabPanel>
          <animated.div style={animationProps} className="mb-12">
            <h1 className={`text-center text-4xl font-bold ${mode === 'dark' ? 'text-white' : 'text-gray-800'} leading-loose`}>
          Order Details
          </h1>

            
            <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
              <table className="w-full text-sm text-left font-semibold">
                <thead className={`text-xs uppercase bg-gray-50 ${mode === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-700'}`}>
                  <tr>
                    {['Payment Id', 'Image', 'Title', 'Price', 'Category', 'Name', 'Address', 'Pincode', 'Phone', 'Email', 'Date'].map((header, index) => (
                      <th key={index} className="px-6 py-4">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className={`border-b ${mode === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} hover:bg-gray-100`}>
                    <td className="px-6 py-4">3393939</td>
                    <td className="px-6 py-4">
                      <img className="w-16 rounded-lg" src="https://dummyimage.com/720x400" alt="img" />
                    </td>
                    <td className="px-6 py-4">Title</td>
                    <td className="px-6 py-4">₹100</td>
                    <td className="px-6 py-4">Pots</td>
                    <td className="px-6 py-4">Name</td>
                    <td className="px-6 py-4">India</td>
                    <td className="px-6 py-4">82828</td>
                    <td className="px-6 py-4">929929929929</td>
                    <td className="px-6 py-4">kkakka@gmail.com</td>
                    <td className="px-6 py-4">12 Aug 2019</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </animated.div>
        </TabPanel>

        {/* User Tab */}
        <TabPanel>
          <animated.div style={animationProps} className="mb-12">
            {/* <h1 className={`text-center text-4xl font-bold ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}>User Details</h1> */}
            <h1 className={`text-center text-4xl font-bold ${mode === 'dark' ? 'text-white' : 'text-gray-800'} leading-loose`}>
         User Details
        </h1>

            <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
              <table className="w-full text-sm text-left font-semibold">
                <thead className={`text-xs uppercase bg-gray-50 ${mode === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-700'}`}>
                  <tr>
                    {['S.No', 'Name', 'Address', 'Pincode', 'Phone', 'Email', 'Date'].map((header, index) => (
                      <th key={index} className="px-6 py-4">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className={`border-b ${mode === 'dark' ? 'bg-gray-800' : 'bg-gray-50'} hover:bg-gray-100`}>
                    <td className="px-6 py-4">1.</td>
                    <td className="px-6 py-4">Name</td>
                    <td className="px-6 py-4">Address</td>
                    <td className="px-6 py-4">181919</td>
                    <td className="px-6 py-4">1991818818</td>
                    <td className="px-6 py-4">kkk@gmail.com</td>
                    <td className="px-6 py-4">12 Aug 2019</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </animated.div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default DashboardTab;
