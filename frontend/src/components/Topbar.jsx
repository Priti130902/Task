import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  selectIsAuthenticated,
  logout,
} from "../features/auth/authSlice";

export default function Topbar() {
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div>
          <span>Hello, </span>
          <span>{user?.name || "Guest"}</span>
        </div>
      </div>

      <div className="topbar-actions">
        {!isAuthenticated ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="primary">
              Sign up
            </Link>
          </>
        ) : (
          <>
            <Link to="/" className="primary">
              Dashboard
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
}
