import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/orders.css';
import { useCookies } from 'react-cookie';
import { useNavigate} from 'react-router-dom';

const Orders = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch the orders from the server
    axios
      .post('http://localhost:5000/get_all_orders', { user_id: cookies.userId })
      .then(res => {
        setOrders(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleOrderClick = async order_id => {
    // Fetch the order items for the selected order
    const response = await axios.post('http://localhost:5000/get_order_items', { order_id: order_id });
    setOrderItems(response.data);

    // Set the selected order
    setSelectedOrder(order_id);
  };
  const handleClick = (productId) => {
    navigate(`/Products/${productId}`);
  };

  const renderOrderItems = () => {
    if (!selectedOrder) {
      return null;
    }

    let totalPrice = 0;
    orderItems.forEach(item => {
      totalPrice += item.price * item.quantity;
    });
    totalPrice = totalPrice.toFixed(2);

    return (
      <div>
        <h2>Order Items ({selectedOrder})</h2>
        <table className="table" >
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map(item => (
              <tr key={item.product_id} onClick={() => handleClick(item.product_id)}>
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
      </div>
    );
  };

  return (
    <div>
      <br />
      <h1 style={{ marginTop: '80px' }}>Orders</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr
              key={order.order_id}
              className={selectedOrder === order.order_id ? 'selected-row' : ''}
              onClick={() => handleOrderClick(order.order_id)}
            >
              <td>{order.order_id}</td>
              <td>{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {renderOrderItems()}
    </div>
  );
};

export default Orders;
