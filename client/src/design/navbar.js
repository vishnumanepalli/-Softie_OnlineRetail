import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../App.css';
import Img1 from './img.png';
import Img2 from './android-chrome-192x192.png';

function Navb() {
    return (
        <>
        <Navbar className="custom-navbar">
          <Container>
            <img src={Img2} alt="cart"  style={{ width: "50px", height: "auto" }}/>
            <Navbar.Brand href="#home">GroceryStore</Navbar.Brand>
            <Nav className="me-auto custom-nav-links">
              <Nav.Link href="#home" className="custom-nav-link">Products</Nav.Link>
              <Nav.Link href="#products" className="custom-nav-link">Login</Nav.Link>
              <Nav.Link href="#login" className="custom-nav-link">
                <img src={Img1} alt="cart" className="shopping-cart-icon" />
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        </>
      );
  }

export default Navb;