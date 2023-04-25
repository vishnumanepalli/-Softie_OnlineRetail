import React, { useState } from 'react';
import '../css/filters.css';

const Filters = ({ products, setFilteredProducts }) => {
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const handlePriceChange = (event) => {
    setPriceRange(event.target.value.split(',').map(Number));
    filterProducts();
  };

  const filterProducts = (category) => {
    if (products) {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
  };


  const handleCategoryClick = (category) => {
    const filtered = products.filter((product) => product.category === category);
    setFilteredProducts(filtered);
  };

  return (
    <div className="filters-container">
      <h4>Filters</h4>
      <div className="category-container">
        <h6>Categories</h6>
        <ul className="category-list">
          <li><span onClick={() => handleCategoryClick('Clothing')}>Clothing</span></li>
          <li><span onClick={() => handleCategoryClick('Electronics')}>Electronics</span></li>
          <li><span onClick={() => handleCategoryClick('Sports,Toys & Luggage')}>Sports,Toys & Luggage</span></li>
          <li><span onClick={() => handleCategoryClick('Grocery')}>Grocery</span></li>
          <li><span onClick={() => handleCategoryClick('Beauty')}>Beauty</span></li>
          <li><span onClick={() => handleCategoryClick('Furniture')}>Furniture</span></li>
        </ul>
      </div>
      <div className="price-range-container">
        <h6>Price Range</h6>
        <div className="price-range-slider">
          <input type="range" name="price" min="0" max="10000" step="10" value={priceRange[0]} onChange={handlePriceChange} />
          <input type="range" name="price" min="0" max="10000" step="10" value={priceRange[1]} onChange={handlePriceChange} />
        </div>
        <div className="price-range-display">
          <p>Price: ₹{priceRange[0]} - ₹{priceRange[1]}</p>
        </div>
      </div>
    </div>
  );
};

export default Filters;
