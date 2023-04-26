import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../css/App.css';
import Img1 from '../images/img.png';
import Img2 from '../images/android-chrome-192x192.png';
import SearchBar from './searchbar';

function Navb() {
  return (
    <>
    <Navbar className="custom-navbar">
      <Container>
        <img src={Img2} alt="cart"  style={{ width: "50px", height: "auto" }}/>
        <Navbar.Brand href="/">GroceryStore</Navbar.Brand>
        <Nav className="me-auto custom-nav-links">
        <SearchBar/>
          <Nav.Link href="/Products" className="custom-nav-link">Products</Nav.Link>
          <Nav.Link href="/Login" className="custom-nav-link">Login</Nav.Link>
          <Nav.Link href="/cart" className="custom-nav-link">
            <img src={Img1} alt="cart" className="shopping-cart-icon" />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    </>
  );
}
  export default Navb;