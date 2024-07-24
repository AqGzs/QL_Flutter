import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CategoryForm from './components/CategoryForm';
import CategoryList from './components/CategoryList';
import Dashboard from './components/Dashboard';
import OrderDetail from './components/OrderDetail';
import OrderList from './components/OrderList';
import ShoeForm from './components/ShoeForm';
import ShoeList from './components/ShoeList';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/shoes" element={<ShoeList />} />
        <Route path="/shoes/new" element={<ShoeForm />} />
        <Route path="/shoes/edit/:id" element={<ShoeForm />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/new" element={<CategoryForm />} />
        <Route path="/categories/edit/:id" element={<CategoryForm />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/:id" element={<OrderDetail />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/edit/:id" element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
