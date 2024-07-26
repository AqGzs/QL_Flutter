import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getShoe } from '../services/api';
import './ShoeDetail.css';

const ShoeDetail = () => {
  const { id } = useParams();
  const [shoe, setShoe] = useState(null);

  useEffect(() => {
    const fetchShoe = async () => {
      try {
        const response = await getShoe(id);
        console.log('Shoe data:', response.data); // Debugging: log the shoe data
        setShoe(response.data);
      } catch (error) {
        console.error('Error fetching shoe:', error);
      }
    };

    fetchShoe();
  }, [id]);

  if (!shoe) return <div>Loading...</div>;

  const totalStock = shoe.stocks ? shoe.stocks.reduce((total, stock) => total + stock.quantity, 0) : 0;

  return (
    <div className="shoe-detail-container">
      <div className="shoe-detail">
        <div className="shoe-image-container">
          <img className="shoe-image" src={shoe.imageUrl} alt={shoe.name} />
        </div>
        <div className="shoe-info">
          <h1>{shoe.name}</h1>
          <p className="shoe-category">Descriptions</p>
          <p className="shoe-description">{shoe.descriptions || 'No description available.'}</p>
          <p className="shoe-price">${shoe.price}</p>
          <p className="shoe-stock">Stock: {totalStock}</p>
          <div className="shoe-size">
            <label htmlFor="size">Select Size:</label>
            <div className="size-options">
              {shoe.stocks ? shoe.stocks.map((stock, index) => (
                <button key={index} className="size-button">{stock.size}</button>
              )) : 'No sizes available.'}
            </div>
          </div>
          <div className="delivery-info">
            <p>Delivery: <span>5-7 days</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoeDetail;
