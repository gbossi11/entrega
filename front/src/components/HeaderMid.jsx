import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/return.png";
import "./components.css";

const HeaderMid = () => {
  return (
    <div className="header-mid">
      <Link to="/">
        <img src={Logo} alt="logo" className="logo-img" />
      </Link>
    </div>
  );
};

export default HeaderMid;
