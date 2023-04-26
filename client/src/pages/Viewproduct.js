import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Viewproduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.post('http://localhost:5000/get_productdetails', { productId: id })
      .then(response => setProduct(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const addToCart = async (productId) => {
    const response = await axios.post('http://localhost:5000/cart', { product_id: productId });
    console.log(response.data);
  }
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <img src={product.image_url} alt={product.name} className='product-image' />
      <button onClick={() => addToCart(product.product_id)}>Add to Cart</button>
    </div>
  );
};

export default Viewproduct;
