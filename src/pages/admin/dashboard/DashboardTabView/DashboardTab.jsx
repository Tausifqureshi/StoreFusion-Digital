import React, { useContext, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { MyContext } from "../../../../context api/myContext";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { AiFillShopping, AiFillStar } from "react-icons/ai";
import { useSpring, animated } from "react-spring";
import Testimonial from "../../../../components/testimonial/Testimonial";

// New modular Tab contents seamlessly separated for perfect performance and clean arch
import ProductManagementTab from "./components/ProductManagementTab";
import OrderManagementTab from "./components/OrderManagementTab";
import CustomerManagementTab from "./components/CustomerManagementTab";

function DashboardTab() {
  const { mode, product, edithandle, deleteProduct, order, user } = useContext(MyContext);
  const isDark = mode === 'dark';
  const [index, setIndex] = useState(0);

  const animationProps = useSpring({
    opacity: 1,
    transform: `translateY(0px)`,
    from: { opacity: 0, transform: `translateY(20px)` },
    reset: true,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs selectedIndex={index} onSelect={(i) => setIndex(i)} className="w-full relative">

        {/* ⭐ Premium Modern Segmented Control Tab List */}
        <div className="mb-8 w-full flex justify-start">
          <TabList className={`flex overflow-x-auto custom-scrollbar gap-2 sm:gap-4 hide-scrollbar p-2 rounded-[2rem] border transition-all ${isDark ? 'bg-[#1e293b] border-gray-800 shadow-[0_8px_30px_rgba(0,0,0,0.3)]' : 'bg-white border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]'}`}>
            {[
              { icon: <MdOutlineProductionQuantityLimits size={18} />, label: "Inventory" },
              { icon: <AiFillShopping size={18} />, label: "Orders" },
              { icon: <FaUser size={18} />, label: "Customers" },
              { icon: <AiFillStar size={18} />, label: "Reviews" },
            ].map((tab, i) => {
              const isSelected = index === i;
              return (
                <Tab
                  key={i}
                  className={`cursor-pointer shrink-0 outline-none flex items-center gap-3 px-6 py-3.5 rounded-full transition-all duration-300 ${
                    isSelected
                      ? (isDark ? 'bg-[#131921] text-blue-400 shadow-[inset_0_1px_4px_rgba(0,0,0,0.3)]' : 'bg-blue-50 text-blue-700 shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)]')
                      : (isDark ? 'text-gray-400 hover:text-gray-200 hover:bg-[#131921]/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50')
                  }`}
                >
                  <div className={`flex items-center justify-center transition-transform duration-300 ${isSelected ? 'scale-110' : ''}`}>
                    {tab.icon}
                  </div>
                  <span className={`text-[14px] font-black tracking-wide`}>
                    {tab.label}
                  </span>
                </Tab>
              );
            })}
          </TabList>
        </div>

        {/* ================= PRODUCT TAB ================= */}
        <TabPanel>
          <animated.div style={animationProps}>
             <ProductManagementTab isDark={isDark} product={product} edithandle={edithandle} deleteProduct={deleteProduct} />
          </animated.div>
        </TabPanel>

        {/* ================= ORDER TAB ================= */}
        <TabPanel>
          <animated.div style={animationProps}>
             <OrderManagementTab isDark={isDark} order={order} />
          </animated.div>
        </TabPanel>

        {/* ================= USER TAB ================= */}
        <TabPanel>
          <animated.div style={animationProps}>
             <CustomerManagementTab isDark={isDark} user={user} />
          </animated.div>
        </TabPanel>

        {/* ================= TESTIMONIAL TAB ================= */}
        <TabPanel>
          <animated.div style={animationProps}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
              <h1 className={`text-3xl md:text-4xl font-black tracking-tight ${isDark ? "text-white" : "text-gray-900"}`}>
                Customer Feedback
              </h1>
            </div>
            <div className={`p-6 rounded-3xl border transition-all overflow-hidden ${isDark ? "bg-[#1e293b] border-gray-800 shadow-lg" : "bg-white border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"}`}>
              <Testimonial isAdmin={true} />
            </div>
          </animated.div>
        </TabPanel>

      </Tabs>
    </div>
  );
}

export default DashboardTab;
