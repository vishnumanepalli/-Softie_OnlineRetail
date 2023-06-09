import Filters from '../design/filters';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/product.css';
import { useNavigate} from 'react-router-dom';
import {useCookies} from 'react-cookie'
import SearchBar from '../design/searchbar';

const Products = (props) => {
  const [cookies,setCookie,removeCookie] = useCookies(null);
  const [products, setProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const fetchProducts = async () => {
    let payload = {searchText:''};
    if (searchText !== '') {
      payload = { searchText:searchText};
    }
    console.log("fetch");
    console.log(searchText);
    const response = await axios.post('http://localhost:5000/get_products', payload);
    setProducts(response.data);
      
    axios.post('http://localhost:5000/get_wishlist', { userId: cookies.userId })
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
    console.log(cookies.userId);
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
    axios.post('http://localhost:5000/get_cartitems', { user_id: cookies.userId  })
      .then(res => {
        setCartItems(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
  const navigateToProductdetails = (productId) => {
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
  
  const handleFiltersChange = (text) => {
    setSearchText(text);
  };

  useEffect(() => {
    fetchProducts();
  }, [searchText]);

  useEffect(() => {
    const numItems = cartItems.length;
    console.log(`Number of items in cart: ${numItems}`);
    props.onAddToCart(numItems);
  }, [cartItems]);

  return (
    <div>
      <Filters onFiltersChange={handleFiltersChange}/>
      <br/>
      <SearchBar onFiltersChange={handleFiltersChange}/>
      <div id="productDetails"></div>
      <div className='product-list'>
          {products.length > 0 ? (
            products.map(product => (
              <div className='product-card' key={product.product_id}>
                <img src={product.image_url} alt={product.name} className='product-image-hp'  onClick={() => navigateToProductdetails(product.product_id)} />
                <h2  onClick={() => navigateToProductdetails(product.product_id)}>{product.name}</h2>
                <p  onClick={() => navigateToProductdetails(product.product_id)}>₹{product.price}</p>
                <div className='button-container'>
                  {cookies.role != 'admin' && (
                    <>
                      <button className='add-to-cart-button' onClick={() => addToCart(product.product_id,product.name)}>Add to Cart</button>
                      <button className='wishlist-button' onClick={() => toggleWishlist(product.product_id)}>
                        {wishlistItems.some(item => item.product_id === product.product_id) ? '❤️' : '🤍'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <h4 style={{marginTop:'90px'}}>We don't have any products to display.</h4>
          )}
        </div>
    </div>
  );
};

export default Products;
