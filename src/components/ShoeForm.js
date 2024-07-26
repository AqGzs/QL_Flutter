import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createShoe, createStock, getShoe, getStock, updateShoe, updateStock } from '../services/api';
import './ShoeForm.css';


const ShoeForm = () => {
  const [shoe, setShoe] = useState({ name: '', brand: '', price: '', stocks: [{ size: '', quantity: '' }], colors: '', imageUrl: '', descriptions: '' });
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
    if (!shoe.descriptions) newErrors.descriptions = "Descriptions are required.";

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
      updatedShoe.stocks = stockResponses.map(stockRes => stockRes.data);

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
      <div className="shoe-form-container">
        <form className="shoe-form" onSubmit={handleSubmit}>
          <h2>{id ? 'Edit Shoe' : 'Add New Shoe'}</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={shoe.name} onChange={handleChange} placeholder="Name" required />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="brand">Brand</label>
            <input type="text" id="brand" name="brand" value={shoe.brand} onChange={handleChange} placeholder="Brand" required />
            {errors.brand && <div className="error">{errors.brand}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="number" id="price" name="price" value={shoe.price} onChange={handleChange} placeholder="Price" required />
            {errors.price && <div className="error">{errors.price}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="colors">Colors</label>
            <input type="text" id="colors" name="colors" value={shoe.colors} onChange={handleChange} placeholder="Colors" required />
            {errors.colors && <div className="error">{errors.colors}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input type="text" id="imageUrl" name="imageUrl" value={shoe.imageUrl} onChange={handleChange} placeholder="Image URL" required />
            {errors.imageUrl && <div className="error">{errors.imageUrl}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="descriptions">Descriptions</label>
            <textarea id="descriptions" name="descriptions" value={shoe.descriptions} onChange={handleChange} placeholder="Descriptions" required />
            {errors.descriptions && <div className="error">{errors.descriptions}</div>}
          </div>
          <h3>Stocks</h3>
          {shoe.stocks.map((stock, index) => (
            <div key={index} className="stock-group">
              <div className="form-group">
                <label htmlFor={`size-${index}`}>Size</label>
                <input type="number" id={`size-${index}`} name="size" value={stock.size} onChange={(e) => handleStockChange(index, e)} placeholder="Size" required />
                {errors[`stocks[${index}].size`] && <div className="error">{errors[`stocks[${index}].size`]}</div>}
              </div>
              <div className="form-group">
                <label htmlFor={`quantity-${index}`}>Quantity</label>
                <input type="number" id={`quantity-${index}`} name="quantity" value={stock.quantity} onChange={(e) => handleStockChange(index, e)} placeholder="Quantity" required />
                {errors[`stocks[${index}].quantity`] && <div className="error">{errors[`stocks[${index}].quantity`]}</div>}
              </div>
              <button type="button" className="remove-stock-button" onClick={() => handleRemoveStock(index)}>Remove</button>
            </div>
          ))}
          <button type="button" className="add-stock-button" onClick={handleAddStock}>Add Stock</button>
          <button type="submit" className="submit-button">Save</button>
        </form>
      </div>
    );
  };
  

export default ShoeForm;