import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_type");

    navigate("/login");
  };

  const isLoggedIn = localStorage.getItem("auth_token");
  return (
    <Navbar bg="dark" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand>Online Exam System</Navbar.Brand>
        <Nav className="ms-auto">
          <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
          {isLoggedIn ? (
            <Nav.Link className="nav-link" onClick={handleLogout}>
              Logout
            </Nav.Link>
          ) : (
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
