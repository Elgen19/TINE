import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" className="justify-content-between">
      <Container fluid>
        <Navbar.Brand>Prelim Exam</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;

