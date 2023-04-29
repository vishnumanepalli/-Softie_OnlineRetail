import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Paper} from '@mui/material';
import '../css/wishlist.css';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch the wishlist items from the server
    axios.post('http://localhost:5000/get_wishlist', { userId: 1 })
      .then(res => {
        setWishlistItems(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const removeItemFromWishlist = async (product_id) => {
    const response = await axios.delete('http://localhost:5000/delete_from_wishlist', { 
      data: { 
        userId: 1, 
        productId: product_id 
      } 
    });
    console.log(response.data);
  }
  const navigateToProductdetails = (productId) => {
    console.log(productId);
    navigate(`/Products/${productId}`);
  };
  
  return (
    <div>
        <br/>
    <div className='wishlist-list'>
    {wishlistItems.map(product => (
    <div className='wishlist-card' key={product.product_id}>
        <button className='delete-wishlist-item-button' onClick={() => removeItemFromWishlist(product.product_id)}>Delete</button>
      <img onClick={() => navigateToProductdetails(product.product_id)} src={product.image_url} alt={product.name} className='wishlist-image-hp'/>
      <h2 onClick={() => navigateToProductdetails(product.product_id)}>{product.name}</h2>
      <p onClick={() => navigateToProductdetails(product.product_id)}>₹{product.price}</p>
    </div>
  ))}
</div>

    </div>
  );
};

export default Wishlist;
