import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import AdminLoginPopup from "./components/AdminLoginPopup/AdminLoginPopup.jsx";
import { ToastContainer } from "react-toastify";

const App = () => {
  const url = "http://localhost:4000";
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setShowLogin(false);
    }
  }, []);

  return (
    <>
      <ToastContainer />

      {/* 🔒 ADMIN LOGIN POPUP */}
      {showLogin && <AdminLoginPopup setShowLogin={setShowLogin} url={url} />}

      {/* ✅ ADMIN PANEL */}
      {!showLogin && (
        <div>
          <Navbar setShowLogin={setShowLogin} />
          <hr />
          <div className="app-content">
            <Sidebar />
            <Routes>
              <Route path="/add" element={<Add url={url} />} />
              <Route path="/list" element={<List url={url} />} />
              <Route path="/orders" element={<Orders url={url} />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
