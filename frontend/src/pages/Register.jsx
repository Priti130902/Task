import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, selectIsAuthenticated, selectAuthLoading, selectAuthError } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");         // register success => Dashboard
    }
  }, [isAuthenticated, navigate]);

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Register</h1>
        <p className="auth-subtitle">
          Create an account to manage your tasks beautifully.
        </p>

        {error && (
          <p style={{ color: "salmon", fontSize: 12, marginBottom: 8 }}>
            {error.msg || "Register failed"}
          </p>
        )}

        <form onSubmit={submit}>
          <input
            className="task-input"
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={onChange}
          />
          <input
            className="task-input"
            style={{ marginTop: 10 }}
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
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="auth-footer-text">
          Already have an account?{" "}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
