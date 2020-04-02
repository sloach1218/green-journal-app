import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <nav className='header'>
      <Link to={'/home'} className='HomeBtn'>Home</Link>
      <Link to={'/add-plant'} className='AddPlantBtn'>Add Plant</Link>
      <Link to={'/home'} className='LogoutBtn'>Logout</Link>
    </nav>
  );
}

export default Nav;
