import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../css/searchbar.css';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/search_product', { searchText: query })
      .then(response => {
        console.log(response.data.results);
        onSearch(response.data.results);
      })
      .catch(error => console.error(error));
      console.log('SearchBar rendered');
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
