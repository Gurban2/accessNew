import React, { useEffect } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";  // Import Link for navigation
import "./header.scss";
import LangSwitcher from "../../modules/LangSwitcher";

const ref = React.createRef();

const Header = ({ userName }) => {
  useEffect(() => {
    const header = ref.current;
    const placeholder = document.createElement("div");

    const updateHeaderSticky = () => {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {        
        placeholder.style.height = `${header.offsetHeight}px`;
        header.parentNode.insertBefore(placeholder, header);
        header.classList.add("header--sticky");
      } else {        
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
            <Navbar.Text className="me-3">              
              <Link to="/login">Login</Link>
            </Navbar.Text>
          </Navbar.Collapse>
          <LangSwitcher />
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
