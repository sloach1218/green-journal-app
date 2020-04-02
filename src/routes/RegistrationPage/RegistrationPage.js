import React from 'react';
import './RegistrationPage.css';
import Header from '../../components/Header/Header'


class RegistrationPage extends React.Component {

  handleSubmit = ev => {
    ev.preventDefault()
    console.log('submitted!')
  }

  render(){
    return (
      <div>
        <Header />
        <form className='RegistrationForm' onSubmit={this.handleSubmit}>
            <div className='username'>
              <label htmlFor='RegistrationForm__username'>
                Username: 
              </label>
              <input
                name='username'
                type='text'
                required
                id='RegistrationForm__username' />
            </div>
            <div className='password'>
              <label htmlFor='RegistrationForm__password'>
                Password: 
              </label>
              <input
                name='password'
                type='text'
                required
                id='RegistrationForm__password' />
            </div>
            <button type='submit'>Create Account</button>
  
        </form>
      </div>
    );
  }
}

export default RegistrationPage;
