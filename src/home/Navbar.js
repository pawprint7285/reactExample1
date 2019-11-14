import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav className="nav-pad-left">
      <NavLink to="/" activeStyle={activeStyle} exact>
        Catalogs
      </NavLink>
      {" | "}
      <NavLink to="/products" activeStyle={activeStyle}>
        Products
      </NavLink>
      {" | "}
      <NavLink to="/attributes" activeStyle={activeStyle}>
        Attributes
      </NavLink>
      {" | "}
      <NavLink to="/courses" activeStyle={activeStyle}>
        The Sample
      </NavLink>
    </nav>
  );
};

export default Navbar;
