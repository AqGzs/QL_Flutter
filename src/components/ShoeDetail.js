import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getShoe } from '../services/api';
import './ShoeDetail.css'; // Thêm tệp CSS nếu cần

const ShoeDetail = () => {
  const { id } = useParams();
  const [shoe, setShoe] = useState(null);

  useEffect(() => {
    const fetchShoe = async () => {
      const response = await getShoe(id);
      setShoe(response.data);
    };

    fetchShoe();
  }, [id]);

  if (!shoe) return <div>Loading...</div>;

  return (
    <div className="shoe-detail">
      <img src={shoe.imageUrl} alt={shoe.name} />
      <h1>{shoe.name}</h1>
      <p>Brand: {shoe.brand}</p>
      <p>Price: {shoe.price}</p>
      <p>Description: {shoe.discriptions}</p>
      <p>Colors: {shoe.colors.join(', ')}</p>
      <p>Stock: {(shoe.stocks || []).reduce((total, stock) => total + stock.quantity, 0)}</p>
    </div>
  );
};

export default ShoeDetail;
