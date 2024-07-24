import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCategory, getCategory, updateCategory } from '../services/api';

const CategoryForm = () => {
  const [category, setCategory] = useState({ name: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await getCategory(id);
      setCategory(response.data);
    };

    if (id) {
      fetchCategory();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateCategory(id, category);
    } else {
      await createCategory(category);
    }
    navigate('/categories');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={category.name} onChange={handleChange} placeholder="Name" required />
      <button type="submit">Save</button>
    </form>
  );
};

export default CategoryForm;
