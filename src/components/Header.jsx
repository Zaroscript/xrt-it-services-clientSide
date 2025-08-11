import React, { useState } from "react";
import { Container, Navbar, NavDropdown, Nav, Button, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsSun, BsMoon, BsXLg, BsList } from "react-icons/bs";

// CSS styles
import "../assets/css/components/header.css";

// Flag images
// import USAFlag from "../assets/images/flags/USA.png";
// import FRFlag from "../assets/images/flags/FR.png";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Add your theme switching logic here
  };

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
        <Container className="px-4">
          {/* Left Section - Logo */}
          <Navbar.Brand as={Link} to="/" className="me-0">
            {/* <img
              src="/img/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Logo"
            /> */}

            <h3 className="text-white">XRT Tech</h3>
          </Navbar.Brand>

          {/* Mobile Toggle Button */}
          <Button 
            variant="outline-secondary" 
            className="d-lg-none ms-auto" 
            onClick={handleShow}
            aria-label="Toggle navigation"
          >
            <BsList size={24} />
          </Button>

          {/* Desktop Navigation */}
          <Navbar.Collapse id="navbar-nav" className="d-none d-lg-block">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/" className="px-3">Home</Nav.Link>
              <Nav.Link as={Link} to="/about" className="px-3">About</Nav.Link>
              <NavDropdown 
                title="Services" 
                id="services-dropdown"
                className="px-3"
              >
                <NavDropdown.Item as={Link} to="/services/#web">Web Development</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/services/#mobile">Mobile Development</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/services/#cloud">Cloud Solutions</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/plans" className="px-3">Plans</Nav.Link>
              <Nav.Link as={Link} to="/portfolio" className="px-3">Portfolio</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="px-3">Contact</Nav.Link>
            </Nav>

            <Nav className="ms-auto align-items-center">
              <Button 
                variant="outline-secondary" 
                className="me-2 rounded-circle p-2" 
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <BsMoon /> : <BsSun />}
              </Button>
              <Link to="/auth/login" className="btn btn-outline-primary me-2">
                Login
              </Link>
              <Link to="/auth/register" className="btn btn-primary">
                Get Started
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Offcanvas Menu */}
      <Offcanvas 
        show={showOffcanvas} 
        onHide={handleClose}
        placement="end"
        className="offcanvas"
      >
        <Offcanvas.Header closeButton closeVariant="white" className="border-bottom">
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" onClick={handleClose} className="py-3 border-bottom">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={handleClose} className="py-3 border-bottom">
              About
            </Nav.Link>
            <div className="py-3 border-bottom">
              <NavDropdown 
                title="Services" 
                id="mobile-services-dropdown"
                className="w-100"
                menuVariant="light"
              >
                <NavDropdown.Item as={Link} to="/services/#web" onClick={handleClose}>
                  Web Development
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/services/#mobile" onClick={handleClose}>
                  Mobile Development
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/services/#cloud" onClick={handleClose}>
                  Cloud Solutions
                </NavDropdown.Item>
              </NavDropdown>
            </div>
            <Nav.Link as={Link} to="/plans" onClick={handleClose} className="py-3 border-bottom">
              Plans
            </Nav.Link>
            <Nav.Link as={Link} to="/portfolio" onClick={handleClose} className="py-3 border-bottom">
              Portfolio
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={handleClose} className="py-3 border-bottom">
              Contact
            </Nav.Link>
            
            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button 
                variant="outline-secondary" 
                className="rounded-circle p-2" 
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <BsMoon /> : <BsSun />}
              </Button>
              <Link to="/auth/login" className="btn btn-outline-primary flex-grow-1" onClick={handleClose}>
                Login
              </Link>
            </div>
            <Link to="/auth/register" className="btn btn-primary mt-3" onClick={handleClose}>
              Get Started
            </Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;
