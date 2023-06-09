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
          <li><span onClick={() => handleCategoryClick('Clothing')}>Clothing</span></li>
          <li><span onClick={() => handleCategoryClick('Sports')}>Sports</span></li>
          <li><span onClick={() => handleCategoryClick('Toys')}>Toys </span></li>
          <li><span onClick={() => handleCategoryClick('Stationary')}>Stationary</span></li>
          <li><span onClick={() => handleCategoryClick('Grocery')}>Grocery</span></li>
          <li><span onClick={() => handleCategoryClick('homedecor')}>Home Decor </span></li>
          <li><span onClick={() => handleCategoryClick('Beauty')}>Beauty</span></li>
        </ul>
      </div>
    </div>
  );
};

export default Filters;
