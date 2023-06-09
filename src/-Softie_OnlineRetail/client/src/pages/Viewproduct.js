import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/viewproduct.css';
import {useCookies} from 'react-cookie'

const Viewproduct = () => {
  const [cookies,setCookie,removeCookie] = useCookies(null);
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


  const addToCart = async () => {
    const response = await axios.post('http://localhost:5000/cart', { user_id:cookies.userId , product_id: id });
    console.log(response.data);
  }
  
  return (
    <div className="view-product">
      <img src={product.image_url} alt={product.name} className='product-image' />
      <div className="product-details">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-description">{product.description}</p>
        <p className="product-price">Price: ₹{product.price}</p>
        {cookies.role != 'admin' && (
          <button className="add-to-cart" onClick={() => addToCart(product.product_id,product.name)}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Viewproduct;
export function displaySearchResults(searchResults) {
  const searchResultsDiv = document.getElementById('searchResults');
  searchResultsDiv.innerHTML = '';

  for (let i = 0; i < searchResults.length; i++) {
    const result = searchResults[i];
    const resultDiv = document.createElement('div');
    resultDiv.innerHTML = `<h3>${result.name}</h3>
                            <p>${result.description}</p>
                            <p>${result.price}</p>`;
    resultDiv.onclick = () => {
      displayProductDetails(result.id);
    };
    searchResultsDiv.appendChild(resultDiv);
  }
}

export function displayProductDetails(productId) {
  axios.get(`/get_productdetails?id=${productId}`)
    .then(response => {
      const productDetailsDiv = document.getElementById('productDetails');
      productDetailsDiv.innerHTML = `<h3>${response.data.name}</h3>
                                      <p>${response.data.description}</p>
                                      <p>${response.data.price}</p>`;
    })
    .catch(error => console.error(error));
}

