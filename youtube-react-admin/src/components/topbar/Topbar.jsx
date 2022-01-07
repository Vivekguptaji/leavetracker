import React, { useEffect, useState } from "react";
import "./topbar.css";
import {ChatBubbleOutline, NotificationsNone, Settings, } from "@material-ui/icons";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover'
import Button from 'react-bootstrap/Button';

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
          <span className="logo">Resource Forecast Tracker [<span className="title">{title}</span>]</span>
        </div>
        <div className="topleft">
          <div className="topbarIconContainer">
          <OverlayTrigger
                placement="bottom"
              trigger="focus"
              
                overlay={
                    <Popover>
                        <Popover.Header as="h3">
                           Notifications
                        </Popover.Header>
                        <Popover.Body>
                            Hey
                        </Popover.Body>
                    </Popover>
                }>
                <Button className="popoverbutton">
                  <NotificationsNone />
                </Button>
            </OverlayTrigger>
            <span className="topIconBadge">8</span>
          </div>
          <div className="topbarIconContainer">
          <OverlayTrigger
                placement="bottom"
                trigger="focus"
                overlay={
                    <Popover>
                        <Popover.Header as="h3">
                           Messages
                        </Popover.Header>
                        <Popover.Body> 
                        </Popover.Body>
                    </Popover>
                }>
                <Button className="popoverbutton">
                  <ChatBubbleOutline />
                </Button>
            </OverlayTrigger>

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
