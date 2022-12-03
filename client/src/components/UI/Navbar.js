import React, { useContext } from "react";
import "./css/navbar.css";
import Logo from "../../img/logo.jpg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="container navbar">
        <div className="logo">
          <Link to="/">
            <img
              src={Logo}
              className="logo-img"
              alt="Cookzilla - Share your recipies"
            />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?cat=science">
            <h6>Science</h6>
          </Link>
          <Link className="link" to="/?cat=technology">
            <h6>Technology</h6>
          </Link>
          <Link className="link" to="/?cat=cinema">
            <h6>Cinema</h6>
          </Link>
          <Link className="link" to="/?cat=design">
            <h6>Design</h6>
          </Link>
          <span className="user-name">{currentUser?.username}</span>
          {currentUser ? (
            <span className="log-out" onClick={logout}>
              Logout
            </span>
          ) : (
            <Link className="link" to="/log-in">
              Login
            </Link>
          )}
          <span className="navbar-write">
            <Link className="link-write" to="/write">
              Write
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
