import React, { useState } from "react";
import { Navbar, Nav, Offcanvas, Collapse } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import sections from "../../constants/navSection";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";  // Icons for collapsible arrows

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // Tracks which main menu is open
  const [openSubmenu, setOpenSubmenu] = useState({}); // Tracks which submenu is open

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Toggle submenu within departments
  const toggleSubmenu = (sectionIndex, departmentIndex) => {
    setOpenSubmenu((prev) => ({
      ...prev,
      [`${sectionIndex}-${departmentIndex}`]:
        !prev[`${sectionIndex}-${departmentIndex}`],
    }));
  };

  return (
    <div>
      {/* Navbar for small screens */}
      <Navbar bg="dark" variant="dark" expand="lg" className="d-lg-none">
        <Navbar.Brand href="#">My App</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
      </Navbar>

      {/* Offcanvas for the Sidebar */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        className="bg-dark text-white"
        placement="start" // Ensure it's from the left on mobile
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {sections.map((section, sectionIndex) => (
              <div key={section.title}>
                <Nav.Link
                  className="text-white fw-bold"
                  onClick={() =>
                    setOpenMenu(openMenu === sectionIndex ? null : sectionIndex)
                  }
                >
                  {section.title}
                  <span className="ms-2">
                    {openMenu === sectionIndex ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </Nav.Link>
                <Collapse in={openMenu === sectionIndex}>
                  <div className="ms-3">
                    {section.departments.map((department, departmentIndex) => (
                      <div key={department.title}>
                        <Nav.Link
                          className="text-white-50 d-flex align-items-center"
                          onClick={() =>
                            toggleSubmenu(sectionIndex, departmentIndex)
                          }
                        >
                          <img
                            src={department.icon}
                            alt={`${department.title} Icon`}
                            style={{ width: "20px", marginRight: "8px" }}
                          />
                          {department.title}
                        </Nav.Link>
                        <Collapse
                          in={openSubmenu[`${sectionIndex}-${departmentIndex}`]}
                        >
                          <div className="ms-4">
                            {department.items.map((item) => (
                              <NavLink
                                key={item.label}
                                to={item.path}
                                className="text-white-75"
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
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Sidebar for large screens */}
      <div
        className="d-none d-lg-block bg-dark text-white vh-100 p-3"
        style={{ width: "250px", transition: "width 0.3s ease-in-out" }}
      >
        <h4>My App</h4>
        <Nav className="flex-column">
          {sections.map((section, sectionIndex) => (
            <div key={section.title}>
              <Nav.Link
                className="text-white fw-bold"
                onClick={() =>
                  setOpenMenu(openMenu === sectionIndex ? null : sectionIndex)
                }
              >
                {section.title}
                <span className="ms-2">
                  {openMenu === sectionIndex ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </Nav.Link>
              <Collapse in={openMenu === sectionIndex}>
                <div className="ms-3">
                  {section.departments.map((department, departmentIndex) => (
                    <div key={department.title}>
                      <Nav.Link
                        className="text-white-50 d-flex align-items-center"
                        onClick={() =>
                          toggleSubmenu(sectionIndex, departmentIndex)
                        }
                      >
                        <img
                          src={department.icon}
                          alt={`${department.title} Icon`}
                          style={{ width: "20px", marginRight: "8px" }}
                        />
                        {department.title}
                      </Nav.Link>
                      <Collapse
                        in={openSubmenu[`${sectionIndex}-${departmentIndex}`]}
                      >
                        <div className="ms-4">
                          {department.items.map((item) => (
                            <NavLink
                              key={item.label}
                              to={item.path}
                              className="text-white-75"
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
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
