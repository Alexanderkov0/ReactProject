import React from "react";
import myImage from "../../../assets/list.png";
import "./NavIconsContainer.css";

export function HouseIcon(myImage) {
    return <img src={myImage} alt="nav visual" className="nav-icons-container img-fluid" />;
  }