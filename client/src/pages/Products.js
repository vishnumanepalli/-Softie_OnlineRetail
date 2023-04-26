import Filters from '../design/filters';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/product.css';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const fetchProducts = async () => {
    const response = await axios.post('http://localhost:5000/get_products');
    setProducts(response.data);
  }

  const addToCart = async (productId,productname) => {
    console.log(1)

    var server_address = 'http://localhost:5000/cart';
    const resp2 = await fetch(server_address, {
      method: "POST",
      headers: { "Content-Type": "application/json", 
      "jwt-token" : localStorage.getItem("token"), },
      body: JSON.stringify({ 
        product_id:productId,
        title : productname
       }),
    });

    const response = await resp2.json();
    console.log("Server response", response);

  }
  const navigateToProductdetails = (productId) => {
    console.log(productId);
    navigate(`/Products/${productId}`);
  };


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
            <button className='add-to-cart-button' onClick={() => addToCart(product.product_id,product.name)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
