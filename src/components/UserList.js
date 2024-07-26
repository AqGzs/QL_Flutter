import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteUser, getUsers } from '../services/api'; // Make sure deleteUser is defined in your API service
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="user-list">
      <header className="header">
        <h1>Users</h1>
      </header>
      <div className="user-grid">
        {users.map(user => (
          <div key={user._id} className="user-card">
            <p>{user.name}</p>
            <p>{user.email}</p>
            <Link to={`/users/${user._id}`} className="details-button">View Details</Link>
            <button onClick={() => handleDelete(user._id)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
