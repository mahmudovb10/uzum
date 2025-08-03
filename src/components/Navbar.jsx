import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../context/globalContext";

function Navbar() {
  const { totalAmount } = useContext(GlobalContext);

  return (
    <header className="bg-base-200">
      <div className="navbar">
        <div className="navbar-start">
          <a href="">
            <img src="/logo.png" alt="" className="w-70" />
          </a>
        </div>

        <div className="navbar-center">
          <ul className="menu menu-horizontal">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <NavLink to="/basket">
            <div className="indicator">
              {totalAmount > 0 && (
                <span className="indicator-item badge badge-secondary">
                  {totalAmount}
                </span>
              )}
              <button className="btn">
                <i className="fa-solid fa-basket-shopping"></i>
              </button>
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
