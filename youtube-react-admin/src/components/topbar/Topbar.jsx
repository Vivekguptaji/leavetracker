import React from "react";
import "./topbar.css";
 
export default function Topbar(props) { 
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div  className="menuDiv" onClick={props.showMenuHandler}>
          <div className="bar1"></div>
          <div className="bar1"></div>
          <div className="bar1"></div>
        </div>
        <div className="topLeft">
          <span className="title">{props.title}</span>
        </div>
        <div className="topLeft">
          <span className="logo">Resource Forecast Tracker</span>
        </div>
      </div>
    </div>
  );
}
