import { Outlet, Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const Layout = () => {
  return (
    <>
        <Navbar variant="light" bg="light">
            <Container>
                <Navbar.Brand href="/">uuCookbook</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Link variant="danger" href="/">Home</Nav.Link>
                    <Nav.Link href="/sign-in">Sign in</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

      <Outlet />
    </>
  )
};

export default Layout;
