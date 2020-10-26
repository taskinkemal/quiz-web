import React, { ReactElement } from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Button } from '../../Controls';

interface NavBarProps {

    onLogout: () => void;
}

function NavBar(props: NavBarProps): ReactElement {

    const { onLogout } = props;
    
    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Quiz Maker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/quizzes">Quizzes</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
          <Form inline>
            <Button value="Logout" onClick={onLogout} />
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }

  export default NavBar;