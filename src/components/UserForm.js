import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser, getUser, updateUser } from '../services/api';

const UserForm = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '', phone: '', address: '', gender: '', dob: '', imageUrl: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser(id);
      setUser(response.data);
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await updateUser(id, user);
    } else {
      await createUser(user);
    }
    navigate('/users');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name" required />
      <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Password" required />
      <input type="text" name="phone" value={user.phone} onChange={handleChange} placeholder="Phone" />
      <input type="text" name="address" value={user.address} onChange={handleChange} placeholder="Address" />
      <input type="text" name="gender" value={user.gender} onChange={handleChange} placeholder="Gender" />
      <input type="date" name="dob" value={user.dob} onChange={handleChange} placeholder="Date of Birth" />
      <input type="text" name="imageUrl" value={user.imageUrl} onChange={handleChange} placeholder="Image URL" />
      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;
