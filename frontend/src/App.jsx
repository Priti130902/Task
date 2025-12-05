import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./features/auth/authSlice";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <div className="app-layout">
      {/* Sidebar & Topbar sirf tabhi dikhen jab user login ho */}
      {isAuthenticated && <Sidebar />}

      <div className="main-area">
        {isAuthenticated && <Topbar />}

        <main className="page-content">
          <Routes>
            {/* ✅ PROTECTED ROUTE */}
            <Route
              path="/"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />

            {/* ✅ PUBLIC ROUTES */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
