import { useContext, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// import { CartContext } from './CartContext';

// ProceedPage component
function Proceed() {
//   const { items, total, clearCart } = useContext(CartContext);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();
  // Handle the "Place Order" button click
  const handlePlaceOrder = () => {
    // Code to place the order would go here
    setOrderPlaced(true);
    // clearCart();
  };

  // Handle the "Back" button click
  
  const handleBackClick = () => {
   
    navigate(`/Cart`);
  };

  return (
    <div>
      <br/>
      <h1 style={{marginTop:'90px'}}>Order Summary</h1>
      
      {/* <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price}
          </li>
        ))}
      </ul>
      <p>Total: {total}</p> */}
      <h2>Payment Options</h2>
      <label>
        <input type="radio" name="paymentOption" value="payOnDelivery" />
        Pay on Delivery
      </label>
      <button onClick={handlePlaceOrder}>Place Order</button>
      {orderPlaced && <p>Order Placed Successfully</p>}
      <button onClick={handleBackClick}>Back</button>
    </div>
  );
}

// // CartProvider component
// function CartProvider(props) {
//   const [items, setItems] = useState([]);
//   const [total, setTotal] = useState(0);

//   const addItem = (item) => {
//     setItems((prevItems) => [...prevItems, item]);
//     setTotal((prevTotal) => prevTotal + item.price);
//   };

//   const removeItem = (id) => {
//     const itemToRemove = items.find((item) => item.id === id);
//     setItems((prevItems) => prevItems.filter((item) => item.id !== id));
//     setTotal((prevTotal) => prevTotal - itemToRemove.price);
//   };

//   const clearCart = () => {
//     setItems([]);
//     setTotal(0);
//   };

//   const contextValue = {
//     items,
//     total,
//     addItem,
//     removeItem,
//     clearCart,
//   };

//   return (
//     <CartContext.Provider value={contextValue}>
//       {props.children}
//     </CartContext.Provider>
//   );
// }

export default Proceed;
