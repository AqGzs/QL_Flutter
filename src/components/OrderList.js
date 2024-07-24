import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteOrder, getOrders } from '../services/api';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const response = await getOrders();
    setOrders(response.data);
  };

  const handleDelete = async (id) => {
    await deleteOrder(id);
    fetchOrders();
  };

  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            Order ID: {order.id}
            <Link to={`/orders/${order.id}`}>View Details</Link>
            <button onClick={() => handleDelete(order.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
