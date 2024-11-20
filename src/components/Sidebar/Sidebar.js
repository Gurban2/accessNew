import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  return (
    <div className="sidebar">
      <Link className="sidebar-link" to="/">
        Dashboard
      </Link>
      <div>
        <h4 className="sidebar-section-title">Offices & Deaprtments</h4>
        <div className="dropdown">
          <button className="dropdown-btn" onClick={() => toggleDropdown("offices")}>
            Offices
          </button>
          <div
            className={`dropdown-content ${openDropdown === "offices" ? "show" : ""
              }`}
          >
            <Link to="/offices/list">List</Link>
            <Link to="/offices/add">Add</Link>
          </div>
        </div>

        <div className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => toggleDropdown("departments")}
          >
            Departments
          </button>
          <div
            className={`dropdown-content ${openDropdown === "departments" ? "show" : ""
              }`}
          >
            <Link to="/departments/list">List</Link>
            <Link to="/departments/add">Add</Link>
          </div>
        </div>

        <div className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => toggleDropdown("rooms")}
          >
            Rooms
          </button>
          <div
            className={`dropdown-content ${openDropdown === "rooms" ? "show" : ""
              }`}
          >
            <Link to="/rooms/list">List</Link>
            <Link to="/rooms/add">Add</Link>
          </div>
        </div>        
      </div>

      <div>
        <h4>Meet</h4>
        <div className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => toggleDropdown("meets")}
          >
            Meets
          </button>
          <div
            className={`dropdown-content ${openDropdown === "meets" ? "show" : ""
              }`}
          >
            <Link to="/offices/list">List</Link>
            <Link to="/offices/add">Upcoming</Link>
            <Link to="/offices/add">Report</Link>
            <Link to="/offices/add">Add</Link>
          </div>
        </div>
        

      </div>

      <div>
        <h4>Visitors</h4>
        <div className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => toggleDropdown("visitors")}
          >
            Visitors
          </button>
          <div
            className={`dropdown-content ${openDropdown === "visitors" ? "show" : ""
              }`}
          >
            <Link to="/visitors/list">All</Link>
            <Link to="/visitors/add">Add</Link>
            <Link to="/visitors/add">Report</Link>
          </div>
        </div>
        <div className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => toggleDropdown("personnongrata")}
          >
            Person Non Grata
          </button>
          <div
            className={`dropdown-content ${openDropdown === "personnongrata" ? "show" : ""
              }`}
          >
            <Link to="/personnongrata/list">List</Link>
            <Link to="/personnongrata/add">Add</Link>
          </div>
        </div>  
      </div>

      <div>
        <h4>Site</h4>
        <div className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => toggleDropdown("site")}
          >
            Site
          </button>
          <div
            className={`dropdown-content ${openDropdown === "site" ? "show" : ""
              }`}
          >
            <Link to="/site/sitesetting">Site Setting</Link>
          </div>
        </div> 
        <div className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => toggleDropdown("translations")}
          >
            Translations
          </button>
          <div
            className={`dropdown-content ${openDropdown === "translations" ? "show" : ""
              }`}
          >
            <Link to="/translations/list">List</Link>
          </div>
        </div> 
      </div>

      <div>
        <h4>User & Permissions</h4>
        <div className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => toggleDropdown("permissions")}
          >
            Permissions
          </button>
          <div
            className={`dropdown-content ${openDropdown === "permissions" ? "show" : ""
              }`}
          >
            <Link to="/permissions/list">All</Link>
          </div>
        </div> 
        <div className="dropdown">
          <button
            className="dropdown-btn"
            onClick={() => toggleDropdown("users")}
          >
            Users
          </button>
          <div
            className={`dropdown-content ${openDropdown === "users" ? "show" : ""
              }`}
          >
            <Link to="/users/list">List</Link>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Sidebar;
