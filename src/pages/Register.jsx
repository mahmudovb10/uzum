import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Login from "./Login.jsx";
import { Link } from "react-router-dom";

function login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log({
      name,
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
    <div className="flex min-h-screen items-center justify-center bg-base-200">
      <div className="w-full max-w-sm shadow-2xl bg-base-100 p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Your name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="email@example.com"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Create a password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Repeat password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <button
              className="btn btn-primary relative left-[6rem]"
              type="submit"
            >
              Create Account
            </button>
          </div>
        </form>
        <Link
          to="/login"
          className="text-sm mt-4 text-center relative left-[5rem]"
        >
          Already have an account?
          <br />
        </Link>
        <Link to="/login" className="link link-primary flex justify-center">
          Login Here
        </Link>
      </div>
    </div>
  );
}

export default login;
