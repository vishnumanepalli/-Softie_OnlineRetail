import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../css/App.css';
import Img1 from '../images/img.png';
import Img2 from '../images/android-chrome-192x192.png';
import Img3 from '../images/wishlist.png';
import {useCookies} from 'react-cookie';
import SearchBar from './searchbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Alert } from 'react-bootstrap';
import React, { useState }  from 'react';


function Navb() {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  console.log(cookies);
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = (results) => {
    setSearchResults(results);
  }
  return (
    <>
      <Navbar className="custom-navbar">
        <Container>
          <img src={Img2} alt="cart" style={{ width: "50px", height: "auto" }} />
          <Navbar.Brand href="/">GroceryStore</Navbar.Brand>
          <Nav className="me-auto custom-nav-links">
          <SearchBar onSearch={handleSearch} />
            <div>
              {searchResults.map(result => (
                <p>{result.name}</p>
              ))}
            </div>
            <Nav.Link href="/Products" className="custom-nav-link">Products</Nav.Link>
            {cookies.userId ? (
              <>
                <NavDropdown title="Account" id="basic-nav-dropdown" className="custom-nav-link">
                <NavDropdown.Item href="/Profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/Orders">Orders</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/" onClick={() => removeCookie(cookies)}>Logout</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/Cart" className="custom-nav-link">
                  <img src={Img1} alt="cart" className="shopping-cart-icon" />
                </Nav.Link>
                <Nav.Link href="/wishlist" className="custom-nav-link">
                  <img src={Img3} alt="wishlist" className="wishlist-icon" />
                </Nav.Link>
              </>
            ) : (
              <Nav.Link href="/Login" className="custom-nav-link">Login</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navb;
