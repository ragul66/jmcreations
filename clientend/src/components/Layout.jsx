// src/components/Layout.js
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"; // Import Navbar

const Layout = ({ setLoading }) => {
  return (
    <div>
      <Navbar /> {/* Navbar is always displayed */}
      <main>
        <Outlet context={{ setLoading }} />{" "}
        {/* Pass the setLoading function to child components */}
      </main>
    </div>
  );
};

export default Layout;
