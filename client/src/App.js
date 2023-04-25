import React, { useState } from 'react';
import './App.css';
import Navb from './design/navbar';
import SearchBar from './searchbar';
import Filters from './filters';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Perform the search logic or API call here
  };

  return (
    <div className="App">
      <Navb />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Filters />
          </div>
          <div className="col-md-9">
            {/* Render products or search results here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
