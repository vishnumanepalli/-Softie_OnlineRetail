import React, { useState }  from 'react';
import './css/App.css';
import Navb from './design/navbar';
import Login from './pages/Login';
import Products from './pages/Products';
import Viewproduct from './pages/Viewproduct';
import Cart from './pages/Cart';
import Wishlist from './pages/wishlist';
import SearchBar from './design/searchbar';
import Home from './pages/Home';
import Admin from './pages/admin';
import Checkout from './pages/Checkout';
import Proceed from './pages/Proceed';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="App">
      <Navb />
      <div>
        {searchResults.map(result => (
          <p>{result.name}</p>
        ))}
      </div>
      <BrowserRouter>
      <Routes>
        <Route index element={<Home/>} />
        <Route exact path="/Products" element={<Products/>} />
        <Route exact path="/Admin" element={<Admin/>} />
        <Route exact path="/Products/:id" element={<Viewproduct/>} />
        <Route exact path="/wishlist" element={<Wishlist/>} />
        <Route path="/Login" element={<Login/>} />
        {/* <Route path=".design/searchbar" element={<SearchBar/>} /> */}
        <Route path="/Cart" element={<Cart/>} />
        <Route path="/Checkout" element={<Checkout/>} />
        <Route path="/Proceed" element={<Proceed/>} />
        <Route path="/Profile" element={<Profile/>} />
        <Route path="/Orders" element={<Orders/>} />
        <Route path="*" element={<h1>404 Error Found</h1>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
