import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createShoe, createStock, getShoe, getStock, updateShoe, updateStock } from '../services/api';

const ShoeForm = () => {
  const [shoe, setShoe] = useState({ name: '', brand: '', price: '', stocks: [{ size: '', quantity: '' }], colors: '', imageUrl: '', discriptions: '' });
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShoe = async () => {
      if (id) {
        const response = await getShoe(id);
        const shoeData = response.data;

        if (shoeData.stocks && shoeData.stocks.length > 0) {
          const stockResponses = await Promise.all(shoeData.stocks.map(stockId => getStock(stockId)));
          shoeData.stocks = stockResponses.map(stockRes => stockRes.data);
        } else {
          shoeData.stocks = [{ size: '', quantity: '' }];
        }

        setShoe(shoeData);
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
    newStocks[index] = { ...newStocks[index], [name]: value };
    setShoe({ ...shoe, stocks: newStocks });
  };

  const handleAddStock = () => {
    setShoe({ ...shoe, stocks: [...shoe.stocks, { size: '', quantity: '' }] });
  };

  const handleRemoveStock = (index) => {
    const newStocks = shoe.stocks.filter((_, i) => i !== index);
    setShoe({ ...shoe, stocks: newStocks });
  };

  const validateFields = () => {
    const newErrors = {};

    if (!shoe.name) newErrors.name = "Name is required.";
    if (!shoe.brand) newErrors.brand = "Brand is required.";
    if (isNaN(parseFloat(shoe.price))) newErrors.price = "Price must be a number.";
    if (!shoe.colors) newErrors.colors = "Colors are required.";
    if (!shoe.imageUrl) newErrors.imageUrl = "Image URL is required.";
    if (!shoe.discriptions) newErrors.discriptions = "Descriptions are required.";

    shoe.stocks.forEach((stock, index) => {
      if (!stock.size) newErrors[`stocks[${index}].size`] = "Size is required.";
      if (!stock.quantity) newErrors[`stocks[${index}].quantity`] = "Quantity is required.";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      console.error("Please fill out all fields correctly.");
      return;
    }

    const updatedShoe = {
      ...shoe,
      price: parseFloat(shoe.price),
      colors: shoe.colors.split(',').map(color => color.trim()),
    };

    try {
      const stockPromises = shoe.stocks.map(stock => {
        if (stock._id) {
          return updateStock(stock._id, stock);
        } else {
          return createStock(stock);
        }
      });

      const stockResponses = await Promise.all(stockPromises);
      updatedShoe.stocks = stockResponses.map(stockRes => stockRes.data._id);

      console.log("Payload being sent to the server:", JSON.stringify(updatedShoe, null, 2));

      if (id) {
        await updateShoe(id, updatedShoe);
      } else {
        await createShoe(updatedShoe);
      }
      navigate('/shoes');
    } catch (error) {
      console.error("Error updating shoe:", error.response ? error.response.data : error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={shoe.name} onChange={handleChange} placeholder="Name" required />
      {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
      <input type="text" name="brand" value={shoe.brand} onChange={handleChange} placeholder="Brand" required />
      {errors.brand && <div style={{ color: 'red' }}>{errors.brand}</div>}
      <input type="number" name="price" value={shoe.price} onChange={handleChange} placeholder="Price" required />
      {errors.price && <div style={{ color: 'red' }}>{errors.price}</div>}
      <input type="text" name="colors" value={shoe.colors} onChange={handleChange} placeholder="Colors" required />
      {errors.colors && <div style={{ color: 'red' }}>{errors.colors}</div>}
      <input type="text" name="imageUrl" value={shoe.imageUrl} onChange={handleChange} placeholder="Image URL" required />
      {errors.imageUrl && <div style={{ color: 'red' }}>{errors.imageUrl}</div>}
      <input type="text" name="discriptions" value={shoe.discriptions} onChange={handleChange} placeholder="Descriptions" required />
      {errors.discriptions && <div style={{ color: 'red' }}>{errors.discriptions}</div>}
      <h3>Stocks</h3>
      {shoe.stocks.map((stock, index) => (
        <div key={index}>
          <input type="number" name="size" value={stock.size} onChange={(e) => handleStockChange(index, e)} placeholder="Size" required />
          {errors[`stocks[${index}].size`] && <div style={{ color: 'red' }}>{errors[`stocks[${index}].size`]}</div>}
          <input type="number" name="quantity" value={stock.quantity} onChange={(e) => handleStockChange(index, e)} placeholder="Quantity" required />
          {errors[`stocks[${index}].quantity`] && <div style={{ color: 'red' }}>{errors[`stocks[${index}].quantity`]}</div>}
          <button type="button" onClick={() => handleRemoveStock(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddStock}>Add Stock</button>
      <button type="submit">Save</button>
    </form>
  );
};

export default ShoeForm;
