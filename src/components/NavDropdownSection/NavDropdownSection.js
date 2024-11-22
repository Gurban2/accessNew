import React from "react";
import { NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function NavDropdownSection({ title, items }) {
  return (
    <NavDropdown title={title} menuVariant="dark">
      {items.map(({ label, path }, index) => (
        <NavDropdown.Item as={NavLink} to={path} key={index}>
          {label}
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
}

export default NavDropdownSection;
