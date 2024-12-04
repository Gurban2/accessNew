import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./header.scss";
import LangSwitcher from "../../modules/LangSwitcher";

const ref = React.createRef();
const Header = ({ userName }) => {
  useEffect(() => {
    const header = ref.current; // Your header reference
    const placeholder = document.createElement("div");

    const updateHeaderSticky = () => {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        // Set the placeholder height to match the header
        placeholder.style.height = `${header.offsetHeight}px`;
        header.parentNode.insertBefore(placeholder, header);
        header.classList.add("header--sticky");
      } else {
        // Remove the placeholder
        placeholder.style.height = "0";
        if (placeholder.parentNode) {
          placeholder.parentNode.removeChild(placeholder);
        }
        header.classList.remove("header--sticky");
      }
    };

    window.addEventListener("scroll", updateHeaderSticky);
    return () => {
      window.removeEventListener("scroll", updateHeaderSticky);
    };
  }, []);

  return (
    <div className="header" ref={ref}>
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
              <Navbar.Text className="me-3">
                <a href="#login">Login</a>
              </Navbar.Text>
            )}
          </Navbar.Collapse>
          <LangSwitcher />
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
