import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrder } from '../services/api';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await getOrder(id);
      setOrder(response.data);
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  if (!order) return <div>Loading...</div>;

  return (
    <div>
      <h1>Order Details</h1>
      <p>Order ID: {order.id}</p>
      <p>User ID: {order.userId}</p>
      <p>Total: {order.total}</p>
      <p>Status: {order.status}</p>
      <p>Date: {order.dateOrder}</p>
      <h2>Items</h2>
      <ul>
        {order.items.map(item => (
          <li key={item.id}>
            {item.shoeId} - {item.priceShoe}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetail;
