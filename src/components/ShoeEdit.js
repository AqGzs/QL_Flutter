import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getShoe, updateShoe } from '../services/api';
import './ShoeEdit.css';

const ShoeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shoe, setShoe] = useState({
    name: '',
    brand: '',
    price: '',
    colors: '',
    imageUrl: '',
    discriptions: '',
    stocks: [{ size: '', quantity: '' }]
  });

  useEffect(() => {
    const fetchShoe = async () => {
      try {
        const response = await getShoe(id);
        const fetchedShoe = response.data;
        setShoe({
          ...fetchedShoe,
          price: fetchedShoe.price.toString(),
          colors: (fetchedShoe.colors || []).join(', '),
          stocks: (fetchedShoe.stocks || []).length ? fetchedShoe.stocks : [{ size: '', quantity: '' }]
        });
      } catch (error) {
        console.error('Error fetching shoe:', error);
      }
    };

    fetchShoe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShoe({ ...shoe, [name]: value });
  };

  const handleStockChange = (index, e) => {
    const { name, value } = e.target;
    const newStocks = [...shoe.stocks];
    newStocks[index][name] = value;
    setShoe({ ...shoe, stocks: newStocks });
  };

  const handleAddStock = () => {
    setShoe({ ...shoe, stocks: [...shoe.stocks, { size: '', quantity: '' }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure that all fields have values
    if (!shoe.name || !shoe.brand || isNaN(parseFloat(shoe.price)) || !shoe.colors || !shoe.imageUrl || !shoe.discriptions) {
      console.error("Please fill out all fields correctly.");
      return;
    }

    const updatedShoe = {
      ...shoe,
      price: parseFloat(shoe.price),
      colors: shoe.colors.split(',').map(color => color.trim()),
      stocks: shoe.stocks.map(stock => ({
        size: parseInt(stock.size, 10),
        quantity: parseInt(stock.quantity, 10)
      }))
    };

    try {
      await updateShoe(id, updatedShoe);
      navigate('/shoes');
    } catch (error) {
      console.error("Error updating shoe:", error);
    }
  };

  return (
    <div className="shoe-edit-container">
      <form className="shoe-edit-form" onSubmit={handleSubmit}>
        <h2>Edit Shoe</h2>
        <input type="text" name="name" value={shoe.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="brand" value={shoe.brand} onChange={handleChange} placeholder="Brand" required />
        <input type="number" name="price" value={shoe.price} onChange={handleChange} placeholder="Price" required />
        <input type="text" name="colors" value={shoe.colors} onChange={handleChange} placeholder="Colors" required />
        <input type="text" name="imageUrl" value={shoe.imageUrl} onChange={handleChange} placeholder="Image URL" required />
        <input type="text" name="discriptions" value={shoe.discriptions} onChange={handleChange} placeholder="Descriptions" required />

        <h3>Stocks</h3>
        {shoe.stocks.map((stock, index) => (
          <div key={index} className="stock-group">
            <input type="number" name="size" value={stock.size} onChange={(e) => handleStockChange(index, e)} placeholder="Size" required />
            <input type="number" name="quantity" value={stock.quantity} onChange={(e) => handleStockChange(index, e)} placeholder="Quantity" required />
          </div>
        ))}
        <button type="button" className="add-stock-button" onClick={handleAddStock}>Add Stock</button>
        <button type="submit" className="update-button">Update Product</button>
      </form>
    </div>
  );
};

export default ShoeEdit;
