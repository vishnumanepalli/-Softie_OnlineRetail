import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../css/searchbar.css';

const SearchBar = (props) => {
  const [query, setQuery] = useState('');

  const handleCategoryClick = (category) => {
    props.onFiltersChange(category);
  };
  
  
  return (
    <Form onSubmit={(event) => {
      event.preventDefault();
      handleCategoryClick(query);
    }} className="search-bar-container">
    <Form.Control
      type="text"
      placeholder="Search for products"
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      className="search-bar-input"
    />
    <Button variant="primary" type="submit" className="search-bar-button">
      Search
    </Button>
    </Form>

  );
};

export default SearchBar;
