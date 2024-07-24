import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteUser, getUsers } from '../services/api';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <div>
      <h1>Users</h1>
      <Link to="/users/new">Add New User</Link>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            <Link to={`/users/edit/${user.id}`}>Edit</Link>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
