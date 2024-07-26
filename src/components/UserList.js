import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteUser, getUsers } from '../services/api';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="user-list">
      <div className="header">
        <h1>Users</h1>
        <Link to="/users/new" className="add-button">Add New User</Link>
      </div>
      <div className="user-grid">
        {users.map(user => (
          <div key={user._id} className="user-card">
            <h3>{user.username}</h3>
            <p>{user.email}</p>
            <Link to={`/users/edit/${user._id}`} className="edit-button">Edit</Link>
            <button onClick={() => handleDelete(user._id)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
