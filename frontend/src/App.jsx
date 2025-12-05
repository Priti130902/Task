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
      {/* Sidebar + Topbar hamesha dikhao,
          bas routes ko protect karo */}
      <Sidebar />
      <div className="main-area">
        <Topbar />

        <main className="page-content">
          <Routes>
            {/* Dashboard sirf logged-in user ke liye */}
            <Route
              path="/"
              element={
                isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
              }
            />

            {/* Login / Register pages:
                agar already login hai to wapas Dashboard */}
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/register"
              element={isAuthenticated ? <Navigate to="/" /> : <Register />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}
