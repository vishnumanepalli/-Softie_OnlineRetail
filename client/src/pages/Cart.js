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
  const navigateToCheckout = () => {
    console.log("hi");
    navigate(`/Checkout`);
  };

  
  const navigateToProducts = () => {
    navigate(`/Products`);
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

  const updateCartItemQuantityplus=async (productId) =>{
    const response = await axios.post('http://localhost:5000/cart', { cart_id:1 , product_id: productId });
    console.log("Server response", response);
  }


  const updateCartItemQuantityminus=async (product_id) =>{
    const response = await axios.post('http://localhost:5000/decrease_cart_item_quantity',{ cartId:1 , productId:product_id } );
    console.log(response.data);
  }

  return (
    <div className="cart-container">
      <br />
      {cartItems.length === 0 ? (
        <div className="cart-item">
          <img src="https://hsnbazar.com/images/empty-cart.png" alt="cart is empty" />
          <button className="continue-shopping-button" onClick={() => navigateToProducts()}>Continue Shopping!</button>
        </div>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Quantity</th>
              <th>Action</th>
              <th>Total Price</th>
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
                  <div className="quantity-control">
                    <button onClick={() => updateCartItemQuantityminus(item.product_id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateCartItemQuantityplus(item.product_id,item.name)}>+</button>
                  </div>
                </td>
                <td>
                  <button onClick={() => removeItemFromCart(item.product_id)}>
                    Delete
                  </button>
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button onClick={() => navigateToCheckout()}>
         Checkout
      </button>
    </div>
  );
}

export default Cart;
