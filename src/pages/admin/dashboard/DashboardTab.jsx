import React, { useContext, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { MyContext } from "../../../context api/myContext";
import {
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { FaUser, FaCartPlus } from "react-icons/fa";
import {
  AiFillShopping,
  AiFillDelete,
  AiFillEdit,
  AiFillStar,
} from "react-icons/ai";
import { useSpring, animated } from "react-spring";
import { Link, useNavigate } from "react-router-dom";
import Testimonial from "../../../components/testimonial/Testimonial";


function DashboardTab() {
  const { mode, product, edithandle, deleteProduct, order, user, testimonial, editTestimonial, deleteTestimonial, getAvatar } =
    useContext(MyContext);

  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const animationProps = useSpring({
    opacity: 1,
    transform: `translateY(0px)`,
    from: { opacity: 0, transform: `translateY(30px)` },
    reset: true,
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <Tabs selectedIndex={index} onSelect={(i) => setIndex(i)}>

        {/* ⭐ Modern Tab List */}
        <TabList className="flex justify-center gap-10 mb-10 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-lg">
          {[
            { icon: <MdOutlineProductionQuantityLimits size={28} />, label: "Products" },
            { icon: <AiFillShopping size={28} />, label: "Orders" },
            { icon: <FaUser size={28} />, label: "Users" },
            { icon: <AiFillStar size={28} />, label: "Testimonials" },
          ].map((tab, i) => (
            <Tab key={i} className="cursor-pointer px-4 py-2 rounded-lg hover:bg-pink-500 hover:text-white transition">
              <div className="flex gap-2 items-center font-semibold">
                {tab.icon}
                {tab.label}
              </div>
            </Tab>
          ))}
        </TabList>

        {/* ================= PRODUCT TAB ================= */}
        <TabPanel>
          <animated.div style={animationProps}>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Products</h1>
              <button
                onClick={() => navigate("/addproduct")}
                className="flex gap-2 items-center bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full hover:scale-105 transition"
              >
                Add Product <FaCartPlus />
              </button>
            </div>

            <div className="overflow-x-auto glass rounded-xl">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    {["Image", "Title", "Price", "Action"].map((h, i) => (
                      <th key={i} className="p-3 text-left">{h}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {product.map((item, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-3">
                        <img src={item.imageUrl} className="w-14 rounded" />
                      </td>
                      <td>{item.title}</td>
                      <td>₹{item.price}</td>
                      <td className="flex gap-3 p-3">
                        <Link to="/updateProduct" onClick={() => edithandle(item)}>
                          <AiFillEdit size={22} className="text-blue-500 cursor-pointer" />
                        </Link>
                        <AiFillDelete
                          size={22}
                          className="text-red-500 cursor-pointer"
                          onClick={() => deleteProduct(item)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </animated.div>
        </TabPanel>

        {/* ================= ORDER TAB ================= */}
        <TabPanel>
          <h1 className="text-3xl font-bold mb-5 text-center">Orders</h1>
          <div className="overflow-x-auto glass rounded-xl p-4">
            {order.map((o, i) => (
              <div key={i} className="border-b py-3">
                <p className="font-semibold">Payment: {o.paymentId}</p>
                <p>Email: {o.email}</p>
              </div>
            ))}
          </div>
        </TabPanel>

        {/* ================= USER TAB ================= */}
        <TabPanel>
          <h1 className="text-3xl font-bold mb-5 text-center">Users</h1>
          <div className="glass p-4 rounded-xl">
            {user.map((u, i) => (
              <div key={i} className="border-b py-2">
                {u.name} — {u.email}
              </div>
            ))}
          </div>
        </TabPanel>

        {/* ================= TESTIMONIAL TAB ================= */}
        {/* <TabPanel>
          <animated.div style={animationProps} className="text-center">
            <h1 className="text-3xl font-bold mb-6">Testimonials</h1>

            <Link to="/addtestimonial">
              <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full hover:scale-105 transition">
                Add Testimonial
              </button>
            </Link>

            <p className="mt-4 text-gray-500">
              Manage and add customer testimonials from here
            </p>
          </animated.div>
        </TabPanel> */}

        {/* <TabPanel>
      <div className="text-center">
      <h1 className="text-3xl font-bold mb-6">Testimonials</h1>

    {/* <Link to="/addtestimonial">
      <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full hover:scale-105 transition">
        Add Testimonial
      </button>
    </Link> */}

        {/* <p className="mt-4 text-gray-500">
      Admin can add, edit or delete testimonials here.
    </p>

    {/* List of testimonials */}
        {/* <div className="mt-6 grid lg:grid-cols-3 gap-4">
      {testimonial.map(item => (
        <div key={item.id} className="p-4 bg-gray-100 rounded shadow flex flex-col items-center">
          <img  
          // src={item.img || "https://i.pravatar.cc/300"}
          src={getAvatar(item)}
           className="w-20 h-20 rounded-full mb-2" />
          <p className="mb-2 text-center">{item.text}</p>
          <h2 className="font-semibold">{item.name}</h2>
          <p className="text-sm text-gray-500">{item.role}</p>
          <div className="mt-2 flex gap-2">
            <button onClick={() => editTestimonial(item)} className="text-blue-500">Edit</button>
            <button onClick={() => deleteTestimonial(item.id)} className="text-red-500">Delete</button>
          </div>
        </div>
      ))}

      
    </div>
  </div> */}
        {/* </TabPanel> */}

        <TabPanel>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-6">Testimonials Management</h1>
            <p className="mb-8 text-gray-500 italic">Manage all customer feedback from one place</p>

            {/* Humne wahi smart component use kiya isAdmin prop ke saath */}
            <Testimonial isAdmin={true} />
          </div>
        </TabPanel>






      </Tabs>
    </div>
  );
}

export default DashboardTab;

