import React, { useContext, useState } from "react";
import "./Navbar.css";
import "animate.css";
import logo from "../testLogo2.png";
import MobileMenu from "./MobileMenu";
import { Link, NavLink, useHistory } from "react-router-dom";
import AuthContext from "../store/Auth-Context";
const Navbar = () => {
  const [isBurgerBtnClicked, setIsBurgerBtnClicked] = useState(0);
  const showMenuHandler = () => {
    setIsBurgerBtnClicked((prevState) => {
      return !prevState;
    });
  };
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const isLoggedin = authCtx.isLoggedin;
  const logoutHandler = () => {
    authCtx.logout();
    history.replace("/");
  };

  return (
    <React.Fragment>
      <MobileMenu
        btnIsClicked={isBurgerBtnClicked}
        stateFunc={setIsBurgerBtnClicked}
      ></MobileMenu>
      <nav id="navbar">
        <div className="first-part">
          <div className="navbar-items">
            <a
              style={{ borderBottom: "none" }}
              className="navbar-logo-anchor"
              href="/"
            >
              <img className="navbar-image" src={logo} alt="logo"></img>
            </a>
            <div
              className="burger-nav-symbol-container"
              onClick={showMenuHandler}
            >
              <div
                className={`burger-nav-symbol__bar ${
                  isBurgerBtnClicked ? "burger-nav-symbol__bar-1" : ""
                }`}
              ></div>
              <div
                className={`burger-nav-symbol__bar-center ${
                  isBurgerBtnClicked ? "burger-nav-symbol__bar-2" : ""
                }`}
              ></div>
              <div
                className={`burger-nav-symbol__bar ${
                  isBurgerBtnClicked ? "burger-nav-symbol__bar-3" : ""
                }`}
              ></div>
            </div>
          </div>
        </div>

        <ul className="second-part">
          <div className="hide-in-small-screen">
            <li className="navbar-items">
              <Link to="/" className="navbar-items-a">
                Home
              </Link>
            </li>
            <li className="navbar-items">
              <Link to="/Browse" className="navbar-items-a">
                Browse
              </Link>
            </li>
            {isLoggedin && (
              <li className="navbar-items">
                <Link to="/Orders" className="navbar-items-a">
                  Orders
                </Link>
              </li>
            )}
          </div>
          {isLoggedin && (
            <li className="navbar-items">
              <Link onClick={logoutHandler} to="#" className="navbar-items-a">
                Logout
              </Link>
            </li>
          )}
          {!isLoggedin && (
            <li className="navbar-items">
              <NavLink
                to="/auth"
                className="navbar-items-a "
                activeClassName="navbar-items-a::after"
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
