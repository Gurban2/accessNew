import React, { useMemo, useState } from "react";
import { Navbar, Nav, Offcanvas, Collapse } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import sections from "../../constants/navSection"; // Your sections data
import {
  FaChevronDown,
  FaChevronRight,
  FaArrowLeft,
  FaArrowRight,
  FaHome,
  FaBars,
} from "react-icons/fa";
import LogoutButton from "../LogoutButton";
import "./Sidebar.scss";

const Sidebar = () => {
  const [show, setShow] = useState(false); // Offcanvas visibility for mobile
  const [isCollapsed, setIsCollapsed] = useState(false); // Tracks sidebar collapsed state
  const [activeHover, setActiveHover] = useState(null); // Tracks hovered icon for pop-out menu
  const [openSubmenu, setOpenSubmenu] = useState({}); // Tracks open submenus
  const [isMouseOn, setIsMouseOn] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleSubmenu = (sectionIndex, departmentIndex) => {
    setOpenSubmenu((prev) => ({
      [`${sectionIndex}-${departmentIndex}`]:
        !prev[`${sectionIndex}-${departmentIndex}`],
    }));
  };

  const hideSidebar = useMemo(() => {
    return isCollapsed && !isMouseOn;
  }, [isCollapsed, isMouseOn]);

  const clickLogout = () => {};

  return (
    <div
      className="sidebar"
      onMouseLeave={() => setIsMouseOn(false)}
      onMouseOver={() => setIsMouseOn(true)}
    >
      {/* Navbar for small screens */}
      <Navbar bg="dark" variant="dark" expand="lg" className="d-lg-none w-100">
        <Navbar.Brand href="/" className="fw-bold text-white cursor-pointer">
          <FaHome /> Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
      </Navbar>

      {/* Mobile Sidebar (Offcanvas) */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        className="sidebar-bg text-white"
        placement="start"
        icon={<FaBars />}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {sections.map((section, index) => (
              <SidebarSection
                key={section.title}
                section={section}
                sectionIndex={index}
                openSubmenu={openSubmenu}
                toggleSubmenu={toggleSubmenu}
              />
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Sidebar for large screens */}

      <div
        className={`d-none sidebar-content d-lg-flex flex-column position-relative bg-dark text-white vh-100s ${
          hideSidebar ? "collapsed-sidebar" : ""
        }`}
        style={{
          width: hideSidebar ? "80px" : "250px",
          // transition: "width 0.3s ease-in-out",
        }}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="btn btn-secondary btn-sm mb-3 w-100 collapse-button"
        >
          {isCollapsed ? <FaArrowRight /> : <FaArrowLeft />}
        </button>
        {!hideSidebar && (
          <Navbar.Brand
            href="/"
            className="fw-bold text-white cursor-pointer mb-3 ms-2"
          >
            <FaHome /> Dashboard
          </Navbar.Brand>
        )}
        <Nav className="flex-column">
          {sections.map((section, index) => (
            <SidebarSection
              handleClose={handleClose}
              key={section.title}
              section={section}
              sectionIndex={index}
              isCollapsed={hideSidebar}
              activeHover={activeHover}
              setActiveHover={setActiveHover}
              openSubmenu={openSubmenu}
              toggleSubmenu={toggleSubmenu}
            />
          ))}
        </Nav>
        <LogoutButton
          text={hideSidebar ? null : "Sign out"}
          onClick={clickLogout}
        />
      </div>
    </div>
  );
};

const SidebarSection = ({
  section,
  sectionIndex,
  isCollapsed,
  activeHover,
  setActiveHover,
  openSubmenu,
  toggleSubmenu,
  handleClose,
}) => {
  const { pathname } = useLocation();

  return (
    <div
      className="position-relative sidebar-section"
      onMouseEnter={() => isCollapsed && setActiveHover(section.title)}
      onMouseLeave={() => isCollapsed && setActiveHover(null)}
    >
      {/* Main Section Link */}
      <Nav.Link
        className={`text-white d-flex align-items-center justify-content-between active-section`}
      >
        <div className="d-flex align-items-center">
          {!isCollapsed && section.title}
        </div>
      </Nav.Link>

      {/* Expand Submenu for Expanded View */}
      <Collapse in={true}>
        <div className="sidebar-collapse-submenu">
          {section.departments.map((department, departmentIndex) => (
            <div key={department.title}>
              <Nav.Link
                className={`${
                  openSubmenu[`${sectionIndex}-${departmentIndex}`]
                    ? "active"
                    : ""
                } text-white d-flex justify-content-${
                  isCollapsed ? "center" : "between"
                } align-items-center`}
                onClick={() => toggleSubmenu(sectionIndex, departmentIndex)}
              >
                {department.icon}
                {!isCollapsed && department.title}
                {!isCollapsed &&
                  (openSubmenu[`${sectionIndex}-${departmentIndex}`] ? (
                    <FaChevronDown className={`ms-auto`} />
                  ) : (
                    <FaChevronRight className={`ms-auto`} />
                  ))}
              </Nav.Link>
              <Collapse in={openSubmenu[`${sectionIndex}-${departmentIndex}`]}>
                <div onClick={handleClose}>
                  {department.items.map((item) => (
                    <NavLink
                      key={item.label}
                      to={item.path}
                      className={`${
                        pathname === item.path ? "active" : ""
                      }text-white text-decoration-none d-block py-1 sidebar-link`}
                    >
                      <FaArrowRight />
                      <h4> {item.label}</h4>
                    </NavLink>
                  ))}
                </div>
              </Collapse>
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

export default Sidebar;
