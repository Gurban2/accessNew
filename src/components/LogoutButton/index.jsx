import React from "react";
import { ReactComponent as LogoutIcon } from "../../assets/icons/dashboard/logout.svg";
import "./style.scss";

const LogoutButton = ({ onClick, text }) => {
  return (
    <div className="logout">
      {text && (
        <span className="logout-text" onClick={onClick}>
          {text}
        </span>
      )}
      <LogoutIcon onClick={onClick} className="logout-icon" />
    </div>
  );
};

export default LogoutButton;
