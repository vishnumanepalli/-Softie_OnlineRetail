import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch the cart items from the server
    axios.post('http://localhost:5000/get_cartitems', { cartId: 1 })
      .then(res => {
        setCartItems(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="cart-container">
    <table className="cart-table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map(item => (
          <tr key={item.product_id}>
            <td>{item.name}</td>
            <td>${item.price.toFixed(2)}</td>
            <td><img className="cart-image" src={item.image_url} alt={item.name} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
}


// import React from 'react';
// import '../css/cart.css';

// const Cart = () => {
//   return (
//     <div className="cart-container">
//       <h1 className="cart-title">Cart</h1>
//         <div className="cart-item">
//           <img src="https://hsnbazar.com/images/empty-cart.png" alt="cart is empty" />
//             <button className="continue-shopping-button">Continue Shopping!</button>
//           </div>
//         </div>
//   );
// }

export default Cart;
