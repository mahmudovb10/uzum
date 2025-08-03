import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Login from "./Login.jsx";
import { Link } from "react-router-dom";

function login() {
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
        <form>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
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
              type="email"
              placeholder="email@example.com"
              className="input input-bordered"
              required
            />
          </div>
          <div class="form-control mb-4">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
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
            <button class="btn btn-primary relative left-[6rem]">
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
          <Link
            to="/login"
            className="link link-primary relative left-[2.5rem]"
          >
            Login Here
          </Link>
        </Link>
      </div>
    </div>
  );
}

export default login;
