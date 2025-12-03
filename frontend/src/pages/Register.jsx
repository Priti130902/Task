import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { Link, Navigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, error } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // if (isAuthenticated) return <Navigate to="/" />;

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    dispatch(registerUser(form));   // ✅ YAHI HONA CHAHIYE
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Register</h1>

        <form onSubmit={submit}>
          <input
            className="task-input"
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
            {loading ? "Registering..." : "Register"}
          </button>

          {error && <p style={{ color: "red", marginTop: 10 }}>{error.msg}</p>}
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
