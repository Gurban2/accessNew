import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavbarDarkExample.scss";

import navSections from "../../constants/navSection";

function NavbarDarkExample() {
  return (
    <Navbar variant="dark" bg="white" expand="lg" className="NavbarDarkExample">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" className="navbar-brand">
          Dashboard
        </Navbar.Brand>
        <Nav className="flex-column">
          {navSections.map((section, sectionIndex) => (
            <div
              key={`section-${sectionIndex}`}
              className={`section-wrapper ${section.title.toLowerCase()}-section`}
            >
              <div className="section-title">{section.title}</div>
              {section.departments.map((dp, depIndex) => (
                <NavDropdown
                  key={`department-${sectionIndex}-${depIndex}`}
                  title={
                    <>
                      {dp.icon && (
                        <img
                          src={dp.icon}
                          alt={`${dp.title} icon`}
                          className="dropdown-icon"
                        />
                      )}
                      {dp.title}
                    </>
                  }
                  menuVariant="dark"
                >
                  {dp.items.map((item, itemIndex) => (
                    <NavDropdown.Item
                      key={`item-${sectionIndex}-${depIndex}-${itemIndex}`}
                      as={NavLink}
                      to={item.path}
                    >
                      {item.label}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ))}
            </div>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavbarDarkExample;
