import Filters from '../design/filters';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/product.css';
import { useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie'

const Products = () => {
  const [cookies,setCookie,removeCookie] = useCookies(null);
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();
  const fetchProducts = async () => {
    const response = await axios.post('http://localhost:5000/get_products');
    setProducts(response.data);
    axios.post('http://localhost:5000/get_wishlist', { userId:  cookies.userId })
      .then(res => {
        setWishlistItems(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  const addToWishlist= async (productId) =>{
    console.log(cookies.userId);

    var server_address = 'http://localhost:5000/add_to_wishlist';
    const resp = await fetch(server_address, {
      method: "POST",
      headers: { "Content-Type": "application/json", 
      "jwt-token" : localStorage.getItem("token"), },
      body: JSON.stringify({ 
        userId:cookies.userId,
        productId:productId
       }),
    });
    
    const response = await resp.json();
    console.log("Server response", response);
    axios.post('http://localhost:5000/get_wishlist', { userId:  cookies.userId })
      .then(res => {
        setWishlistItems(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const addToCart = async (productId) => {
    console.log(1)

    var server_address = 'http://localhost:5000/cart';
    const resp2 = await fetch(server_address, {
      method: "POST",
      headers: { "Content-Type": "application/json", 
      "jwt-token" : localStorage.getItem("token"), },
      body: JSON.stringify({ 
        user_id: cookies.userId,
        product_id:productId
       }),
    });
   
    const response = await resp2.json();
    console.log("Server response", response);

  }
  const navigateToProductdetails = (productId) => {
    console.log(productId);
    navigate(`/Products/${productId}`);
  };

  const removeFromWishlist = async (product_id) => {
    const response = await axios.delete('http://localhost:5000/delete_from_wishlist', { 
      data: { 
        userId:  cookies.userId, 
        productId: product_id 
      } 
    });
    axios.post('http://localhost:5000/get_wishlist', { userId:  cookies.userId })
      .then(res => {
        setWishlistItems(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const toggleWishlist = (productId) => {
    if (wishlistItems.some(item => item.product_id === productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  }
  

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Filters />
      <br/>
      <div className='product-list'>
        {products.map(product => (
          <div className='product-card' key={product.product_id}>
            <img src={product.image_url} alt={product.name} className='product-image-hp'  onClick={() => navigateToProductdetails(product.product_id)} />
            <h2  onClick={() => navigateToProductdetails(product.product_id)}>{product.name}</h2>
            <p  onClick={() => navigateToProductdetails(product.product_id)}>₹{product.price}</p>
            <div className='button-container'>
              <button className='add-to-cart-button' onClick={() => addToCart(product.product_id,product.name)}>Add to Cart</button>
              <button className='wishlist-button' onClick={() => toggleWishlist(product.product_id)}>
                {wishlistItems.some(item => item.product_id === product.product_id) ? '❤️' : '🤍'}
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
