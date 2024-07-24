import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteCategory, getCategories } from '../services/api';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await getCategories();
    setCategories(response.data);
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
    fetchCategories();
  };

  return (
    <div>
      <h1>Categories</h1>
      <Link to="/categories/new">Add New Category</Link>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            {category.name}
            <Link to={`/categories/edit/${category.id}`}>Edit</Link>
            <button onClick={() => handleDelete(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
