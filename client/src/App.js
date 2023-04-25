import React, { useState } from 'react';
import './App.css';
import Navb from './design/navbar';
import Filters from './filters';
import Login from './pages/Login';
import Products from './pages/Products';
import Cart from './pages/Cart';
import { BrowserRouter,HashRouter, Route, Router, Routes } from "react-router-dom";


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
    
      <BrowserRouter>
      <Routes>
        <Route index element={<Products/>} />
        <Route exact path="/Products" element={<Products/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Cart" element={<Cart/>} />
        <Route path="*" element={<h1>404 Error Found</h1>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
