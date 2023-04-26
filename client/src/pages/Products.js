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

  const addToCart = async (productId) => {
    const response = await axios.post('http://localhost:5000/cart', { product_id: productId });
    console.log(response.data);
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
          <div className='product-card' key={product.product_id} onClick={() => navigateToProductdetails(product.product_id)}>
            <img src={product.image_url} alt={product.name} className='product-image-hp' />
            <h2>{product.name}</h2>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
