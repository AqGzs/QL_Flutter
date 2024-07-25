import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import Login from './components/Login';
import OrderDetail from './components/OrderDetail';
import OrderList from './components/OrderList';
import ShoeDelete from './components/ShoeDelete';
import ShoeEdit from './components/ShoeEdit';
import ShoeForm from './components/ShoeForm';
import ShoeList from './components/ShoeList';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/shoes" element={<ShoeList />} />
          <Route path="/shoes/new" element={<ShoeForm />} />
          <Route path="/shoes/edit/:id" element={<ShoeEdit />} />
          <Route path="/shoes/delete/:id" element={<ShoeDelete />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/edit/:id" element={<UserForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
