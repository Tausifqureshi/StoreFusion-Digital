import React, { useContext } from "react";
import { MyContext } from "../../context api/myContext";
import Layout from "../../components/layout/Layout";
import { FaRocket, FaLightbulb, FaGlobeAsia } from "react-icons/fa";

function Aout() {
  const { mode } = useContext(MyContext);

  return (
    <Layout>
      <section
        className={`transition-colors duration-300 ${
          mode === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
        }`}
      >
        {/* ✅ Hero Section */}
        <div
          className={`text-center py-16 px-6 md:px-20 ${
            mode === "dark" ? "bg-gray-800" : "bg-white"
          } shadow`}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            About <span className="text-blue-600">StoreFusion</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-80">
            Welcome to <span className="font-semibold">StoreFusion</span> – your
            one-stop destination for shopping. We bring you the latest
            collection of products at unbeatable prices.
          </p>
        </div>

        {/* ✅ Mission / Why Us / Vision */}
        <div className="container mx-auto px-6 md:px-20 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission Card */}
            <div
              className={`p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ${
                mode === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <FaRocket className="text-4xl text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
              <p className="opacity-80">
                To make shopping easy, enjoyable, and budget-friendly with fast
                delivery and secure payments.
              </p>
            </div>

            {/* Why Us Card */}
            <div
              className={`p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ${
                mode === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <FaLightbulb className="text-4xl text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-3">Why StoreFusion?</h2>
              <p className="opacity-80">
                From electronics to lifestyle products, we fuse variety with
                quality — so you always get the best.
              </p>
            </div>

            {/* Vision Card */}
            <div
              className={`p-8 rounded-2xl shadow-lg text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ${
                mode === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <FaGlobeAsia className="text-4xl text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
              <p className="opacity-80">
                To become India’s most trusted and customer-friendly e-commerce
                platform, loved by millions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Aout;
