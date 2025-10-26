import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); 
    alert("You have been logged out successfully.");
    navigate("/"); 
  };

  return (
    <Navbar expand="lg" bg="light"  className="shadow-sm py-3">
      <Container>
    
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
         
            <NavLink
              className={({ isActive }) =>
                "nav-link mx-2 fw-semibold" +
                (isActive ? " active text-success fw-bold" : " text-dark")
              }
              to="/AboutUs"
            >
              About 
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                "nav-link mx-2 fw-semibold" +
                (isActive ? " active fw-bold text-success" : " text-dark")
              }
              to="/contact"
            >
              Contact 
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                "nav-link mx-2 fw-semibold" +
                (isActive ? " active fw-bold text-success" : " text-dark")
              }
              to="/login"
            >
              Login
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                "nav-link mx-2 fw-semibold" +
                (isActive ? " active fw-bold text-success" : " text-dark")
              }
              to="/register"
            >
              Register
            </NavLink>

            <Button
              variant="outline-success"
              className="mx-2 fw-semibold"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
