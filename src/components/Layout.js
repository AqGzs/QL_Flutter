import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout">
      <header className="header">
        <div className="logo">F5SHOESSTORE</div>
        <nav className="nav">
          <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
          <NavLink to="/logout" className="nav-link">Logout</NavLink>
        </nav>
        <div className="welcome">Welcome admin <img src="/profile-img.png" alt="profile" className="profile-img" /></div>
      </header>
      <div className="container">
        <aside className="sidebar">
          <NavLink to="/shoes" className="sidebar-link" activeClassName="active">Shoes</NavLink>
          <NavLink to="/orders" className="sidebar-link" activeClassName="active">Orders</NavLink>
          <NavLink to="/users" className="sidebar-link" activeClassName="active">Users</NavLink>
        </aside>
        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
