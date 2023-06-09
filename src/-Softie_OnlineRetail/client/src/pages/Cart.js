import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import '../css/cart.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useCookies} from 'react-cookie'

const Cart = () => {
  const [cookies,setCookie,removeCookie] = useCookies(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the cart items from the server
    axios.post('http://localhost:5000/get_cartitems', { user_id: cookies.userId  })
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
        user_id: cookies.userId , 
        productId: product_id 
      } 
    });
    console.log(response.data);
    axios.post('http://localhost:5000/get_cartitems', { user_id: cookies.userId  })
      .then(res => {
        setCartItems(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const updateCartItemQuantityplus=async (productId) =>{
    const response = await axios.post('http://localhost:5000/cart', { user_id:cookies.userId  , product_id: productId });
    console.log("Server response", response);
    axios.post('http://localhost:5000/get_cartitems', { user_id: cookies.userId  })
      .then(res => {
        setCartItems(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }


  const updateCartItemQuantityminus=async (product_id) =>{
    const response = await axios.post('http://localhost:5000/decrease_cart_item_quantity',{ user_id:cookies.userId  , productId:product_id } );
    console.log(response.data);
    axios.post('http://localhost:5000/get_cartitems', { user_id: cookies.userId  })
      .then(res => {
        setCartItems(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      totalPrice += item.price * item.quantity;
    }
    return totalPrice.toFixed(2);
  };

  return (
    <div className="cart-container">
      <br />
      {cartItems.length === 0 ? (
        <div className="cart-item">
          <img src="https://hsnbazar.com/images/empty-cart.png" alt="cart is empty" />
          <button className="continue-shopping-button" onClick={() => navigateToProducts()}>Continue Shopping!</button>
        </div>
      ) : (
        <div>
        <table className="cart-table">
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
                    <button  className="quantity-button" onClick={() => updateCartItemQuantityminus(item.product_id)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="quantity-button"onClick={() => updateCartItemQuantityplus(item.product_id,item.name)}>+</button>
                  </div>
                </td>
                <td>
                  <button className="deletebutton" onClick={() => removeItemFromCart(item.product_id)}>
                    Delete
                  </button>
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Total Price: {calculateTotalPrice()}</h3>
        <button className="checkoutbutton" onClick={() => navigateToCheckout()}>
           Checkout
        </button>
        </div>
      )}
      
    </div>
  );
}

export default Cart;
