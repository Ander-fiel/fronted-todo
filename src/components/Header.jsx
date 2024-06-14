import React, { useContext } from "react";
import {
  Navbar,
  Container,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  Nav,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink } from "react-router-dom";
import { FaBook, FaDoorOpen, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import authService from "../services/authService";
import { AuthContext } from "../context/authContext";
import styled from "styled-components";

function Header() {
  const { user, setAuthentication } = useContext(AuthContext);

  const isAuthenticated = !!user;

  const handleLogout = async () => {
    setAuthentication(null);
    authService.logout();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <NavbarBrand>
            Taskify <FaBook style={{ position: "relative", top: "-1px" }} />
          </NavbarBrand>
        </LinkContainer>
        <NavbarToggle aria-controls="basic-navbar-nav"></NavbarToggle>
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="ms-auto text-center">
            {isAuthenticated ? (
              <LinkContainerCustom to="/login">
                <Nav.Link as={NavLink} onClick={handleLogout}>
                  <FaDoorOpen /> Logout
                </Nav.Link>
              </LinkContainerCustom>
            ) : (
              <>
                <LinkContainerCustom to="/login">
                  <Nav.Link as={NavLink}>
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                </LinkContainerCustom>
                <LinkContainerCustom to="/register">
                  <Nav.Link as={NavLink}>
                    <FaSignOutAlt /> Sign Up
                  </Nav.Link>
                </LinkContainerCustom>
              </>
            )}
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}

export default Header;

const LinkContainerCustom = styled(LinkContainer)`
  animation-name: inout;
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;

  &:hover {
    background-color: #4b4b4b;
  }

  @keyframes inout {
    0% {
      width: 20%;
    }

    100% {
      width: 100%;
    }
  }
`;
