import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FavoritesSidebar from "./FavoritesSidebar";

const NavBar = () => {
  const logout = () => localStorage.setItem("token", "");

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    const token = localStorage.getItem("token");

    if (token) {
      setShow(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/#/">Ecommerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/#/login">Login</Nav.Link>
              <Nav.Link href="/#/favorites">Purchases</Nav.Link>
              <Nav.Link role="button" onClick={handleShow}>
                Cart
              </Nav.Link>
              <Nav.Link role="button" onClick={logout}>
                Log out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <FavoritesSidebar show={show} handleClose={handleClose} />
    </div>
  );
};

export default NavBar;
