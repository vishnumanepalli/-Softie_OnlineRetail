import React, { useState, useEffect } from 'react';
import '../css/cart.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigateToProducts = () => {
    navigate(`/Products`);
  };
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    const response = await axios.post('http://localhost:5000/get_cart', { email: '2020csb1097@iitrpr.ac.in' });
    setCartItems(response.data);
  }

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="cart-container">
      <h1 className="cart-title">Cart</h1>
      {cartItems.length === 0 ? (
        <div className="cart-item">
          <img src="https://hsnbazar.com/images/empty-cart.png" alt="cart is empty" />
          <button className="continue-shopping-button" onClick={() => navigateToProducts()}>Continue Shopping!</button>
        </div>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.product_id}>
                <td>{item.product_id}</td>
                <td>{item.product_name}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Cart;
