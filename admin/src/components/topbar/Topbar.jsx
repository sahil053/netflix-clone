import React from "react";
import "./topbar.css";
import { Language, NotificationsNone, Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/" className="link">
            <span className="logo">Admin Panel</span>
          </Link>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
            <span className="topIconBadge">2</span>
          </div>
          <img
            src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
            alt=""
            className="topAvatar"
          />
        </div>
      </div>
    </div>
  );
}
