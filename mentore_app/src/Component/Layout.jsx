import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footerbar from "./Footerbar";
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet key={location.pathname}/>
      <Footerbar />
    </>
  );
};

export default Layout;
