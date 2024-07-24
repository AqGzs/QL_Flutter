import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteShoe } from '../services/api';
// import './ShoeDelete.css'; // Tạo hoặc xóa dòng này nếu chưa có tệp CSS

const ShoeDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteShoe(id);
    navigate('/shoes');
  };

  return (
    <div className="shoe-delete">
      <h1>Are you sure you want to delete this product?</h1>
      <button onClick={handleDelete} className="delete-button">Yes, Delete</button>
      <button onClick={() => navigate('/shoes')} className="cancel-button">No, Cancel</button>
    </div>
  );
};

export default ShoeDelete;
