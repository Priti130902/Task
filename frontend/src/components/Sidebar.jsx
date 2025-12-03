import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, selectIsAuthenticated } from "../features/auth/authSlice";

export default function Sidebar() {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const activeClass = ({ isActive }) =>
    "sidebar-link" + (isActive ? " sidebar-link-active" : "");

  return (
    <aside className="sidebar">
      {/* LOGO */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-badge">T</div>
        <div>
          <div className="sidebar-logo-text">Task Board</div>
          <div className="sidebar-sub">Organise your day</div>
        </div>
      </div>

      {/* NAV LINKS – ALWAYS SHOW */}
      <nav className="sidebar-nav">
        <NavLink to="/" className={activeClass} end>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/login" className={activeClass}>
          <span>Login</span>
        </NavLink>

        <NavLink to="/register" className={activeClass}>
          <span>Register</span>
        </NavLink>
      </nav>

      {/* USER INFO BOTTOM */}
      <div className="sidebar-user">
        <div className="sidebar-avatar">
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>
            {user?.name || "Guest user"}
          </div>
          <div className="sidebar-sub">
            {isAuthenticated ? "Logged in" : "Not logged in"}
          </div>
        </div>
      </div>
    </aside>
  );
}
