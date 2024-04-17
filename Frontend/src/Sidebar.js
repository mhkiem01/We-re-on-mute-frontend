import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Ensure this points to the correct path of Sidebar.css

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <h1>Menu</h1>
        <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Home</NavLink>
        <NavLink to="/compose" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Compose</NavLink>
        <NavLink to="/inbox" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Inbox</NavLink>
        <NavLink to="/sent" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Sent</NavLink>
        <NavLink to="/creation" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Creation</NavLink>
        <NavLink to="/randering" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Rendering</NavLink>
        <NavLink to="/validation" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Validation</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;