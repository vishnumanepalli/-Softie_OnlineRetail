import { useContext, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useCookies} from 'react-cookie'
  
// ProceedPage component
function Proceed() {
    const [cookies,setCookie,removeCookie] = useCookies(null);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [paymentOption, setPaymentOption] = useState("");
    const navigate = useNavigate();
  
    // Handle the "Place Order" button click
    const handlePlaceOrder = async () => {
      if (paymentOption === "payOnDelivery") {
        const response = await axios.post('http://localhost:5000/emptycart', { user_id :cookies.userId});
        console.log(response.data);
        setOrderPlaced(true);
      }
    };
  
    // Handle the "Back" button click
    const handleBackClick = () => {
      if(orderPlaced){
      navigate(`/Cart`);}
      else{
        navigate(`/Checkout`);
      }
    };

    return (
        <div>
          <br/>
          <h1 style={{marginTop:'90px'}}>Order Summary</h1>
          
      {!orderPlaced && <h2>Payment Options</h2>}
      {!orderPlaced && <label>
        <input
          type="radio"
          name="paymentOption"
          value="payOnDelivery"
          onChange={(e) => setPaymentOption(e.target.value)}
        />
        Pay on Delivery
      </label>}

      {!orderPlaced && <button onClick={handlePlaceOrder} disabled={paymentOption !== "payOnDelivery"}>
        Place Order
      </button>}

      {orderPlaced && <p>Order Placed Successfully</p>}
      <button onClick={handleBackClick}>Back</button>
    </div>
  );
}

export default Proceed;
