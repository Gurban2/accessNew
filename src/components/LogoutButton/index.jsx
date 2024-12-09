import React from "react";
import { ReactComponent as LogoutIcon } from "../../assets/icons/dashboard/logout.svg";
import "./style.scss";

const LogoutButton = ({ onClick, text }) => {
  return (
    <div className="logout" onClick={onClick}>
      {text && (
        <span className="logout-text" onClick={onClick}>
          {text}
        </span>
      )}
      <LogoutIcon className="logout-icon" />
    </div>
  );
};

export default LogoutButton;
