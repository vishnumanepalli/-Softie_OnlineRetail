import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../css/App.css';
import Img1 from '../images/img.png';
import Img2 from '../images/android-chrome-192x192.png';
import Img3 from '../images/wishlist.png';
import {useCookies} from 'react-cookie';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Alert } from 'react-bootstrap';
import React, { useState }  from 'react';
import { Link } from 'react-router-dom';

function Navb(props) {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  console.log(cookies);
  const isAdmin = cookies.role == 'admin'; // check if user is admin
  console.log(cookies.role);
  console.log(isAdmin);
  const handleLogout = () => {
    removeCookie('userId');
    removeCookie('userName');
    removeCookie('token');
    removeCookie('role');
    window.location.href = '/';
  };

  return (
    <>
      <Navbar className="custom-navbar">
        <Container>
          <img src={Img2} alt="cart" style={{ width: "50px", height: "auto" }} />
          <Navbar.Brand href="/">SmartStore</Navbar.Brand>
          <Nav className="me-auto custom-nav-links">
            <Nav.Link href="/Products" className="custom-nav-link">Products</Nav.Link>
            {isAdmin ? ( // show different options based on user role
              <>
                <NavDropdown title="Admin" id="basic-nav-dropdown" className="custom-nav-link">
                  <NavDropdown.Item href="/addproducts">Add Products</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                {cookies.userId ? (
                  <>
                    <NavDropdown title="Account" id="basic-nav-dropdown" className="custom-nav-link">
                      <NavDropdown.Item href="/Profile">Profile</NavDropdown.Item>
                      <NavDropdown.Item href="/Orders">Orders</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/Cart" className="custom-nav-link">
                      {props.cartCount > 0 && (
                        <span className="cart-count">{props.cartCount}</span>
                      )}
                      <img src={Img1} alt="cart" className="shopping-cart-icon" />
                    </Nav.Link>
                    <Nav.Link href="/wishlist" className="custom-nav-link">
                      <img src={Img3} alt="wishlist" className="wishlist-icon" />
                    </Nav.Link>
                  </>
                ) : (
                  <Nav.Link href="/Login" className="custom-nav-link">Login</Nav.Link>
                )}
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navb;

