import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../App.css';

function Navb() {
    return (
        <>
        <Navbar className="custom-navbar">
          <Container>
            <Navbar.Brand href="#home">GroceryStore</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Products</Nav.Link>
              <Nav.Link href="#features">Login</Nav.Link>
              <Nav.Link href="#pricing"><img src="./img.png" alt="Cart" /></Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        </>
      );
  }

export default Navb;
