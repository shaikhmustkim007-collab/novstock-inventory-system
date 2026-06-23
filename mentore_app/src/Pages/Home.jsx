import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axiosInstance.get("/product/product-list");
      setProducts(data);
    } catch (err) {
      console.log("Error fetching products:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Inventory Dashboard</h1>
        <p className="text-lg text-slate-500">Track and manage your stock with precision and speed.</p>
      </div>

      {/* Product Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => (
          <div 
            key={item._id} 
            className="group bg-white rounded-2xl p-5 border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-blue-400 hover:-translate-y-1"
          >
            {/* Image Box */}
            <div className="overflow-hidden rounded-xl mb-4 h-48">
              <img 
                src={`http://localhost:5000/uploads/${item.productImage}`} 
                alt={item.productName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Info */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 truncate">{item.productName}</h3>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">{item.description}</p>
              
              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 line-through">MRP: ₹{item.mrpPrice}</span>
                  <span className="text-xl font-black text-blue-700">₹{item.price}</span>
                </div>
                <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;