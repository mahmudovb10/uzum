import React from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import regsiter from "./Register.jsx";

function login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log({
      email,
      password,
    });
  };
  const navigate = () => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate("/register");
    };
  };
  return (
    <div>
      <div className="flex min-h-screen items-center justify-center bg-base-200">
        <div className="w-full max-w-sm shadow-2xl bg-base-100 p-8 rounded-xl">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                className="input input-bordered"
                required
                name="email"
              />
            </div>
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                required
                name="password"
              />
              <label className="label">
                <Link to="/register" className="label-text-alt link link-hover">
                  Forgot Password
                </Link>
              </label>
            </div>
            <div className="form-control">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default login;
