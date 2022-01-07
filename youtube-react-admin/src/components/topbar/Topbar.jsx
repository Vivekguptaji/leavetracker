import React, { useEffect, useState } from "react";
import "./topbar.css";
import {ChatBubbleOutline, NotificationsNone, Language, Settings } from "@material-ui/icons";

export default function Topbar(props) {
  const [title, setTitle] = useState('');
  useEffect(() => {
    let pageTitle = sessionStorage.getItem('title');
    setTitle(pageTitle ? pageTitle : 'Welcome');
  })
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="menuDiv" onClick={props.showMenuHandler}>
          <div className="bar1"></div>
          <div className="bar1"></div>
          <div className="bar1"></div>
        </div>

        <div className="topLeft">
          <span className="logo">Resource Forecast Tracker</span>
        </div>
        <div className="topleft">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <ChatBubbleOutline />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
        </div>
      </div>
    </div>
  );
}
