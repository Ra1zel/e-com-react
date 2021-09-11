import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../store/Auth-Context";
import "./MobileMenu.css";
let xaxa = -100;
const MobileMenu = (props) => {
  if (Number(props.btnIsClicked) === 1) {
    xaxa = 0;
  } else {
    xaxa = -105;
  }
  const dropHandler = () => {
    props.stateFunc();
  };
  const authCtx = useContext(AuthContext);
  const isLoggedin = authCtx.isLoggedin;
  return (
    <div>
      {props.btnIsClicked ? (
        <div className="backdrop-modal" onClick={dropHandler}></div>
      ) : (
        ""
      )}
      <div className="modal" style={{ transform: `translateX(${xaxa}%)` }}>
        <ul>
          <li>
            <Link to="/" className="navbar-items-b">
              Home
            </Link>
          </li>
          <br></br>
          <li>
            <Link to="/Browse" className="navbar-items-b">
              Browse
            </Link>
          </li>
          <br></br>
          {isLoggedin && (
            <li>
              <Link to="/orders" className="navbar-items-b">
                Orders
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
export default MobileMenu;
