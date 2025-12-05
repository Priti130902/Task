import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectIsAuthenticated, selectAuthLoading, selectAuthError } from "../features/auth/authSlice";
import { Navigate, Link, useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Agar already logged in hai to direct Dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");              // 👈 yahan tumhara Dashboard route hai
    }
  }, [isAuthenticated, navigate]);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));     
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Log in</h1>
        <p className="auth-subtitle">
          Welcome back! Enter your credentials to access your tasks.
        </p>

        {error && (
          <p style={{ color: "salmon", fontSize: 12, marginBottom: 8 }}>
            {error.msg || "Login failed"}
          </p>
        )}

        <form onSubmit={submit}>
          <input
            className="task-input"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={onChange}
          />
          <input
            className="task-input"
            style={{ marginTop: 10 }}
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={onChange}
          />

          <button type="submit" className="btn-primary">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer-text">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="auth-link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
