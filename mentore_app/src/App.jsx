import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Component/Layout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Card from "./Pages/Card";
import AddProduct from "./AdminComponent/AddProduct";
import AdminRoute from "./AdminComponent/AdminRoute";
import About from "./Pages/About";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/card" element={<Card />} />
            <Route path="/about" element={<About />} />
            {/* Admin Panel */}
            <Route
              path="/addProduct"
              element={
                <AdminRoute>
                  <AddProduct />
                </AdminRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
