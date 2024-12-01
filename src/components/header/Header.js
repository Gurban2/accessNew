import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./header.scss";

const Header = ({ userName }) => {
  return (
    <div className="header">
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Access Store</Navbar.Brand>
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
    </div>
  );
};

export default Header;
