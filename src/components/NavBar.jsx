import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";


const NavBar = () => {
  return (
    <Navbar expand="lg" bg="light" fixed="top" className="shadow-sm py-3">
      <Container>
        {/* Brand */}
        <Navbar.Brand
          as={NavLink}
          to="/"
          className="fw-bold text-success fs-3 text-decoration-none"
        >
          Logify
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="logify-navbar" />
        <Navbar.Collapse id="logify-navbar">
          <Nav className="ms-auto align-items-center">
            {/* About Us */}
            <NavLink
              className={({ isActive }) =>
                "nav-link mx-2 fw-semibold" +
                (isActive ? " active text-success fw-bold" : " text-dark")
              }
              to="/AboutUs"
            >
              About 
            </NavLink>

            {/* Report (Your requested structure) */}
            <NavLink
              className={({ isActive }) =>
                "nav-link mx-2 fw-semibold" +
                (isActive ? " active fw-bold text-success" : " text-dark")
              }
              to="/contact"
            >
             Contact 
            </NavLink>

            {/* Login */}
            <NavLink
              className={({ isActive }) =>
                "nav-link mx-2 fw-semibold" +
                (isActive ? " active fw-bold text-success" : " text-dark")
              }
              to="/login"
            >
              Login
            </NavLink>

            {/* Register */}
        <NavLink
              className={({ isActive }) =>
                "nav-link mx-2 fw-semibold" +
                (isActive ? " active fw-bold text-success" : " text-dark")
              }
              to="/register"

            > Register</NavLink>
             
    
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

