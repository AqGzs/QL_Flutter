import React, { useEffect, useState } from 'react';
import { getOrders } from '../services/api';
import './OrderList.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-list">
      <h1>Orders</h1>
      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="order-grid">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <h3>Order ID: {order._id}</h3>
              <p>User: {order.user}</p>
              <p>Total: ${order.total}</p>
              <p>Status: {order.status}</p>
              <div>
                <h4>Items:</h4>
                <ul>
                  {order.items.map(item => (
                    <li key={item._id}>
                      {item.productName} - Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;
