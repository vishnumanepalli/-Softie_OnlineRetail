import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Profile from "./Profile";
import '../css/Checkout.css';

function CheckoutPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const navigate = useNavigate();

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
      <Profile />
      <form style={{marginTop:'10px'}} onSubmit={handleSubmit}>
        <Link to="/Cart"><button className='button'>Back to Cart</button></Link>
        <button className='button' type="submit" onClick={() => navigateToProceed()}>
          Proceed
       </button>
      </form>
    </div>
  );
}

export default CheckoutPage;