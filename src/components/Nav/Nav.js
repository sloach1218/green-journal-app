import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

class Nav extends React.Component {
  handleLogout = () => {
    TokenService.clearAuthToken()
  }
  
  
  render(){
    return (
      <nav className='mainNav'>
          
          <Link to={'/home'} className='HomeBtn'><FontAwesomeIcon icon={faSeedling} className="navIcon"/>My Plants</Link>
          <Link to={'/add-plant'} className='AddPlantBtn'><FontAwesomeIcon icon={faPlus} className="navIcon" />Add Plant</Link>
          <Link to={'/'} onClick={this.handleLogout} className='LogoutBtn'><FontAwesomeIcon icon={faSignOutAlt} className="navIcon" />Logout</Link>
      </nav>
    );
  }
}

export default Nav;
