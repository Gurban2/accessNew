import React, { useState } from "react";
import { Navbar, Nav, Offcanvas, Collapse } from "react-bootstrap";
import { NavLink, useLocation, Link } from "react-router-dom";
import sections from "../../constants/navSection"; // Your sections data
import {
  FaChevronDown,
  FaChevronRight,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import LogoutButton from "../LogoutButton";
import "./Sidebar.scss";

const Sidebar = () => {
  const [show, setShow] = useState(false); // Offcanvas visibility for mobile
  const [isCollapsed, setIsCollapsed] = useState(false); // Tracks sidebar collapsed state
  const [activeSection, setActiveSection] = useState(null); // Tracks active section
  const [activeHover, setActiveHover] = useState(null); // Tracks hovered icon for pop-out menu
  const [openSubmenu, setOpenSubmenu] = useState({}); // Tracks open submenus

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleSubmenu = (sectionIndex, departmentIndex) => {
    setOpenSubmenu((prev) => ({
      ...prev,
      [`${sectionIndex}-${departmentIndex}`]:
        !prev[`${sectionIndex}-${departmentIndex}`],
    }));
  };

  const clickLogout = () => {
    console.log("Logout");
  };

  return (
    <div className="sidebar">
      {/* Navbar for small screens */}
      <Navbar bg="dark" variant="dark" expand="lg" className="d-lg-none w-100">
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold text-white cursor-pointer"
        >
          Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
      </Navbar>

      {/* Mobile Sidebar (Offcanvas) */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        className="bg-dark text-white"
        placement="start"
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
                isCollapsed={false} // Mobile view is always expanded
                activeSection={activeSection}
                setActiveSection={setActiveSection}
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
          isCollapsed ? "collapsed-sidebar" : ""
        }`}
        style={{
          width: isCollapsed ? "80px" : "250px",
          transition: "width 0.3s ease-in-out",
        }}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="btn btn-secondary btn-sm mb-3 w-100 collapse-button"
        >
          {isCollapsed ? <FaArrowRight /> : <FaArrowLeft />}
        </button>
        {!isCollapsed && (
          <Navbar.Brand
            as={Link}
            to="/"
            className="fw-bold text-white cursor-pointer mb-3 ms-2"
          >
            Dashboard
          </Navbar.Brand>
        )}
        <Nav className="flex-column">
          {sections.map((section, index) => (
            <SidebarSection
              key={section.title}
              section={section}
              sectionIndex={index}
              isCollapsed={isCollapsed}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              activeHover={activeHover}
              setActiveHover={setActiveHover}
              openSubmenu={openSubmenu}
              toggleSubmenu={toggleSubmenu}
            />
          ))}
        </Nav>
        <LogoutButton text="Sign out" onClick={clickLogout} />
      </div>
    </div>
  );
};

const SidebarSection = ({
  section,
  sectionIndex,
  isCollapsed,
  activeSection,
  setActiveSection,
  activeHover,
  setActiveHover,
  openSubmenu,
  toggleSubmenu,
}) => {
  const isOpen = activeSection === sectionIndex;
  const { pathname } = useLocation();

  return (
    <div
      className="position-relative sidebar-section"
      onMouseEnter={() => isCollapsed && setActiveHover(section.title)}
      onMouseLeave={() => isCollapsed && setActiveHover(null)}
    >
      {/* Main Section Link */}
      <Nav.Link
        as={NavLink}
        to={section.link || "/"} // Default link to section, or fallback to home
        className={`text-white d-flex align-items-center justify-content-between ${
          isOpen ? "active-section" : ""
        }`}
        onClick={() => setActiveSection(isOpen ? null : sectionIndex)}
      >
        <div className="d-flex align-items-center">
          <img
            src={section.icon}
            alt={`${section.title} Icon`}
            className="me-2"
            style={{ width: "20px" }}
          />
          {!isCollapsed && section.title}
        </div>
        {!isCollapsed &&
          (isOpen ? (
            <FaChevronDown className={`ms-auto`} />
          ) : (
            <FaChevronRight className={`ms-auto`} />
          ))}
      </Nav.Link>

      {/* Pop-Out Menu for Collapsed View */}
      {isCollapsed && activeHover === section.title && (
        <div className="submenu-popout bg-dark text-white position-absolute p-2">
          <h6 className="text-white mb-2 submenu-title">{section.title}</h6>
          {section.departments.map((department, departmentIndex) => (
            <div key={department.title}>
              <Nav.Link
                className={`${
                  openSubmenu[`${sectionIndex}-${departmentIndex}`]
                    ? "active"
                    : ""
                } text-white d-flex justify-content-between align-items-center`}
                onClick={() => toggleSubmenu(sectionIndex, departmentIndex)}
              >
                {department.title}
                {openSubmenu[`${sectionIndex}-${departmentIndex}`] ? (
                  <FaChevronDown className={`ms-auto`} />
                ) : (
                  <FaChevronRight className={`ms-auto`} />
                )}
              </Nav.Link>
              <Collapse in={openSubmenu[`${sectionIndex}-${departmentIndex}`]}>
                <div>
                  {department.items.map((item) => (
                    <NavLink
                      key={item.label}
                      to={item.path}
                      className={`${
                        pathname === item.path ? "active" : ""
                      } text-white text-decoration-none d-block py-1 sidebar-link`}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </Collapse>
            </div>
          ))}
        </div>
      )}

      {/* Expand Submenu for Expanded View */}
      <Collapse in={isOpen && !isCollapsed}>
        <div className="ms-3">
          {section.departments.map((department, departmentIndex) => (
            <div key={department.title}>
              <Nav.Link
                className={`${
                  openSubmenu[`${sectionIndex}-${departmentIndex}`]
                    ? "active"
                    : ""
                } text-white d-flex justify-content-between align-items-center`}
                onClick={() => toggleSubmenu(sectionIndex, departmentIndex)}
              >
                {department.title}
                {openSubmenu[`${sectionIndex}-${departmentIndex}`] ? (
                  <FaChevronDown className={`ms-auto`} />
                ) : (
                  <FaChevronRight className={`ms-auto`} />
                )}
              </Nav.Link>
              <Collapse in={openSubmenu[`${sectionIndex}-${departmentIndex}`]}>
                <div>
                  {department.items.map((item) => (
                    <NavLink
                      key={item.label}
                      to={item.path}
                      className={`${
                        pathname === item.path ? "active" : ""
                      } text-white text-decoration-none d-block py-1 sidebar-link`}
                    >
                      {item.label}
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
