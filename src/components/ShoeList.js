import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteShoe, getShoes } from '../services/api';

const ShoeList = () => {
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    fetchShoes();
  }, []);

  const fetchShoes = async () => {
    const response = await getShoes();
    setShoes(response.data);
  };

  const handleDelete = async (id) => {
    await deleteShoe(id);
    fetchShoes();
  };

  return (
    <div>
      <h1>Shoes</h1>
      <Link to="/shoes/new">Add New Shoe</Link>
      <ul>
        {shoes.map(shoe => (
          <li key={shoe.id}>
            {shoe.name} - {shoe.brand}
            <Link to={`/shoes/edit/${shoe.id}`}>Edit</Link>
            <button onClick={() => handleDelete(shoe.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoeList;
