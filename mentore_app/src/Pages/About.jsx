// src/pages/About.jsx
import React from "react";

const About = () => {
  return (
    <div className="container mx-auto py-16 px-6 max-w-4xl">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          About <span className="text-blue-700">NovStock</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          NovStock was built to eliminate the complexities of inventory management. 
          Our goal is to provide developers and business owners with a platform that is 
          fast, secure, and incredibly easy to use.
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8 md:p-12 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why we built this</h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          In today's digital era, where everything is connected, accurate stock tracking 
          is more critical than ever. We designed NovStock on the core principles of 
          being <strong>Simple, Fast, and Effective</strong>, ensuring that you can focus 
          on your business while we handle the data.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-8 border border-gray-100 rounded-2xl bg-gray-50 hover:border-blue-200 transition-colors">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
          <p className="text-gray-600">
            To make professional-grade inventory management accessible, 
            intuitive, and stress-free for everyone.
          </p>
        </div>
        <div className="p-8 border border-gray-100 rounded-2xl bg-gray-50 hover:border-blue-200 transition-colors">
          <h3 className="text-xl font-bold text-gray-900 mb-3">Built for Speed</h3>
          <p className="text-gray-600">
            Leveraging the full power of the MERN stack to deliver seamless, 
            lag-free performance for real-time data management.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;