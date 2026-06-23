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
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      
      <div className="space-y-4">
        {products.map((item) => (
          <div 
            key={item._id} 
            className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <img 
                src={`http://localhost:5000/uploads/${item.productImage}`} 
                alt={item.productName}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{item.productName}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">₹{item.price}</p>
              <p className="text-xs text-gray-400 line-through">MRP: ₹{item.mrpPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;