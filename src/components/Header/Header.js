import React, { useState } from "react";
import "./Header.css";

function Header() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = () => {
    // Add logout functionality here
    console.log("Logout clicked");
  };

  return (
    <header className="fixed-header">
      <div className="header-content">
        <h1 className="header-title">My App</h1>
        <div className="user-profile">
          <img
            src="/path-to-user-image.jpg"
            alt="User"
            className="user-image"
            onClick={toggleDropdown}
          />
          {dropdownVisible && (
            <div className="dropdown-menu">
              <a href="/admin">Admin</a>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
