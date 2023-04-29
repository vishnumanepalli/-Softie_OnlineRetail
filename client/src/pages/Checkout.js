import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function CheckoutPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    fetch('/api/user') // replace this with your backend API endpoint for fetching user data
      .then(response => response.json())
      .then(data => {
        setName(data.name);
        setEmail(data.email);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission
  };
  
  const navigateToProceed = () => {
    console.log("hi");
    navigate(`/Proceed`);
  };

  return (
    <div>
      <h1>Checkout</h1>
      <h2>Address Details</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} />
        <br />
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" name="address" value={address} onChange={handleAddressChange} required />
        <br />
        <label htmlFor="country">Country:</label>
        <input type="text" id="country" name="country" value={country} onChange={handleCountryChange} required />
        <br />
        <label htmlFor="state">State/Region:</label>
        <input type="text" id="state" name="state" value={state} onChange={handleStateChange} required />
        <br />
        <label htmlFor="city">City:</label>
        <input type="text" id="city" name="city" value={city} onChange={handleCityChange} required />
        <br />
        <Link to="/Cart"><button>Back to Cart</button></Link>
        <button type="submit" onClick={() => navigateToProceed()}>
          Proceed
       </button>
      </form>
    </div>
  );
}

export default CheckoutPage;
