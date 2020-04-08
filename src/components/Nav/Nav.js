import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service';

class Nav extends React.Component {
  handleLogout = () => {
    TokenService.clearAuthToken()
  }
  
  
  render(){
    return (
      <nav className='header'>
        <Link to={'/home'} className='HomeBtn'>Home</Link>
        <Link to={'/add-plant'} className='AddPlantBtn'>Add Plant</Link>
        <Link to={'/'} onClick={this.handleLogout} className='LogoutBtn'>Logout</Link>
      </nav>
    );
  }
}

export default Nav;
