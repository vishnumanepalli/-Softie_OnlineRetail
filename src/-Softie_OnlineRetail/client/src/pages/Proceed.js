import { useContext, useState , useEffect} from 'react';
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
    const [CartItems, setCartItems] = useState([]);
    useEffect(() => {
      // Fetch the wishlist items from the server
      axios.post('http://localhost:5000/get_cartitems', { user_id: cookies.userId  })
      .then(res => {
        setCartItems(res.data);
      })
      .catch(error => {
        console.log(error);
      });
    }, []);
  
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

    let totalPrice = 0;
    CartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    totalPrice = totalPrice.toFixed(2);

    return (
        <div>
          <br/>
          <h1 style={{marginTop:'90px'}}>Order Summary</h1>
          <table className="table">
        <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
        </thead>
        <tbody>
          {CartItems.map(item => (
            <tr key={item.product_id}>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>₹{item.price}</td>
            <td>
              <img src={item.image_url} alt={item.name} style={{ width: '60px', height: '60px' }} />
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      <p>Total Price: ₹{totalPrice}</p>
      {!orderPlaced && <h2>Payment Options</h2>}
      {!orderPlaced && <label style={{marginBottom:"10px"}}>
        <input
          type="radio"
          name="paymentOption"
          value="payOnDelivery"
          onChange={(e) => setPaymentOption(e.target.value)}
        />
        Pay on Delivery
      </label>}
      <br/>
      {orderPlaced && <p>Order Placed Successfully</p>}
      <button onClick={handleBackClick} style={{marginRight:"10px"}}>Back</button>
      {!orderPlaced && <button onClick={handlePlaceOrder} disabled={paymentOption !== "payOnDelivery"} >
        Place Order
      </button>}

      
    </div>
  );
}

export default Proceed;
