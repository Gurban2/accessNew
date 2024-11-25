import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./NavbarDarkExample.scss";
import navSections from "../../constants/navSection";

function NavbarDarkExample() {
  return (
    <Navbar variant="dark" bg="dark" expand="lg" className="NavbarDarkExample">
      <Container fluid>
        <Navbar id="navbar-dark-example">
          <Nav className="flex-column">
            <Navbar.Brand as={NavLink} to="/" className="navbar-brand">
              Dashboard
            </Navbar.Brand>

            {navSections.map((section, index) => (
              <div key={`nav-${index}`} className={`${section.title}-section`}>
                <div className="section-title">{section.title}</div>
                {section.departments.map((dp, index) => (
                  <NavDropdown key={`dp-${index}`} title={dp.title} menuVariant="dark">
                    {dp.items.map((item, index) => (
                      <NavDropdown.Item key={`nav-item-${index}`} as={NavLink} to={item.path}>
                        {item.label}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                ))}
              </div>
            ))}
          </Nav>
        </Navbar>
      </Container>
    </Navbar>
  );
}

export default NavbarDarkExample;
