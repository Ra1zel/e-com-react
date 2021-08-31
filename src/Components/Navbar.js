import React from "react";
import "./Navbar.css";
import "animate.css";
import logo from "../testLogo2.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="first-part">
        <div className="navbar-items">
          <a
            style={{ borderBottom: "none" }}
            className="navbar-logo-anchor"
            href="/"
          >
            <img className="navbar-image" src={logo} alt="logo"></img>
          </a>
        </div>
      </div>
      <ul className="second-part">
        <li className="navbar-items">
          <a href="/">Home</a>
        </li>
        <li className="navbar-items">
          <a href="/">Cart</a>
        </li>
        <li className="navbar-items">
          <a href="/">Sign up</a>
        </li>
        <li className="navbar-items">
          <a href="/">Login</a>
        </li>
        <li className="navbar-items">
          <a href="/">Logout</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
