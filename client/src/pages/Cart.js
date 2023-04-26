import React from 'react';
import '../css/cart.css';

const Cart = () => {
  return (
    <div className="cart-container">
      <h1 className="cart-title">Cart</h1>
        <div className="cart-item">
          <img src="https://hsnbazar.com/images/empty-cart.png" alt="cart is empty" />
            <button className="continue-shopping-button">Continue Shopping!</button>
          </div>
        </div>
  );
}

export default Cart;
