import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import '../css/cart.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
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
  const navigateToProductdetails = (productId) => {
    console.log(productId);
    navigate(`/Products/${productId}`);
  };
  const removeItemFromCart = async (product_id) =>  {
    const response = await axios.delete('http://localhost:5000/delete_from_cart', { 
      data: { 
        cartId: 1, 
        productId: product_id 
      } 
    });
    console.log(response.data);
  };

  return (
        <div className="cart-container">
      <br />
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.product_id}>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <img
                  className="cart-image"
                  src={item.image_url}
                  alt={item.name}
                  onClick={() => navigateToProductdetails(item.product_id)}
                />
              </td>
              <td>
                <button onClick={() => removeItemFromCart(item.product_id)}>
                  Delete
                </button>
              </td>
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
