import React, { useState } from 'react';
import '../css/filters.css';
import { Form, Button } from 'react-bootstrap';

const Filters = (props) => {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [query, setQuery] = useState('');

  const handlePriceChange = (event) => {
    setPriceRange(event.target.value.split(',').map(Number));
    // filterProducts();
  };

  const handleCategoryClick = (category) => {
    props.onFiltersChange(category);
  };

  return (
    <div className="filters-container">
      <h4>Filters</h4>
      <div className="category-container">
        <h6>Categories</h6>
        <ul className="category-list">
          <li><span onClick={() => handleCategoryClick('vegetables')}>Vegetables</span></li>
          <li><span onClick={() => handleCategoryClick('Fruits')}>Fruits</span></li>
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
