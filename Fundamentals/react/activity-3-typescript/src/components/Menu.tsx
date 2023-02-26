import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useLocation } from "react-router-dom";

export default function Menu() {
  const pathname = useLocation().pathname;
  const activeRoute = (path: string) => (pathname === path ? "active" : "");
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">Menu</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              className={activeRoute("/activity/list")}
              as={NavLink}
              to="/activity/list"
            >
              Activities To-Do List
            </Nav.Link>
            <Nav.Link
              className={activeRoute("/client/list")}
              as={NavLink}
              to="/client/list"
            >
              Clients Management
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              align={"end"}
              title="Lucas Garcia"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">My Account</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Configurations
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
