import React from "react";
import burgerLogo from "../../../assests/images/burger-logo.png";
import classes from "./Logo.module.css";

const logo = () => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="myBurger" />
  </div>
);
export default logo;