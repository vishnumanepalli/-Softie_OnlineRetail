import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './searchbar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <Form onSubmit={handleSubmit} className="search-bar-container">
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
