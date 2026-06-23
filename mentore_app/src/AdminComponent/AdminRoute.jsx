import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { state } = useContext(AuthContext); // check karega ki context mai role shhai aarha hai

//   const navigate = useNavigate();

  if (!state.user || state.user.role !== "admin") {
    return <Navigate to="/home" />; // agar admin nahi hai toh home par bhrj dega
  }
  return children;
};

export default AdminRoute;
