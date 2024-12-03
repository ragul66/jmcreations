// src/main.jsx
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

// Layout
import Layout from "./components/Layout";

// Pages
import Productpage from "./pages/productpage";
import Home from "./pages/Home";
import Preloader from "./components/Preloader"; // Import the Preloader component
import AddCategory from "./pages/AddCategory";
import Login from "./pages/Login";

const App = () => {
  const [loading, setLoading] = useState(true);

  // Simulate an initial loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Set the duration you want the preloader to show

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      element: <Layout setLoading={setLoading} />, // Pass setLoading to Layout
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/  ",
          element: <Home />,
        },
        {
          path: "/addproductpage",
          element: <Productpage />,
        },
        {
          path: "/addcategory&age&Lang",
          element: <AddCategory />,
        },
      ],
    },
  ]);

  return loading ? <Preloader /> : <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
