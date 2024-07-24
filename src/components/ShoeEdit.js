import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getShoe, updateShoe } from '../services/api';
// import './ShoeEdit.css'; // Tạo hoặc xóa dòng này nếu chưa có tệp CSS

const ShoeEdit = () => {
  const { id } = useParams();
  const [shoe, setShoe] = useState({ name: '', brand: '', price: '', stocks: [], colors: '', imageUrl: '', discriptions: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShoe = async () => {
      const response = await getShoe(id);
      setShoe(response.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateShoe(id, shoe);
    navigate('/shoes');
  };

  return (
    <form onSubmit={handleSubmit} className="shoe-form">
      <input type="text" name="name" value={shoe.name} onChange={handleChange} placeholder="Name" required />
      <input type="text" name="brand" value={shoe.brand} onChange={handleChange} placeholder="Brand" required />
      <input type="number" name="price" value={shoe.price} onChange={handleChange} placeholder="Price" required />
      <input type="text" name="colors" value={shoe.colors} onChange={handleChange} placeholder="Colors" required />
      <input type="text" name="imageUrl" value={shoe.imageUrl} onChange={handleChange} placeholder="Image URL" required />
      <input type="text" name="discriptions" value={shoe.discriptions} onChange={handleChange} placeholder="Descriptions" required />
      <h3>Stocks</h3>
      {shoe.stocks.map((stock, index) => (
        <div key={index}>
          <input type="number" name="size" value={stock.size} onChange={(e) => handleStockChange(index, e)} placeholder="Size" required />
          <input type="number" name="quantity" value={stock.quantity} onChange={(e) => handleStockChange(index, e)} placeholder="Quantity" required />
          <button type="button" onClick={() => handleRemoveStock(index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={handleAddStock}>Add Stock</button>
      <button type="submit">Update Product</button>
    </form>
  );
};

export default ShoeEdit;