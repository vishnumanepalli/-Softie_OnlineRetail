import Filters from '../design/filters';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios.post('http://localhost:5000/get_products');
    setProducts(response.data);
  }

  const addToCart = async (productId) => {
    const response = await axios.post('http://localhost:5000/cart', { product_id: productId });
    console.log(response.data);
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
            <img src={product.image_url} alt={product.name} className='product-image' />
            <h2>{product.name}</h2>
            <p>₹{product.price}</p>
            <button onClick={() => addToCart(product.product_id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
