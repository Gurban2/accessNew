import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./header.scss";

function Header({ userName }) {
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">My Application</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {userName ? (
            <Navbar.Text>
              Signed in as: <a href="#profile">{userName}</a>
            </Navbar.Text>
          ) : (
            <Navbar.Text>
              <a href="#login">Login</a>
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
