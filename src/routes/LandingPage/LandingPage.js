import React from 'react';
import { Link } from 'react-router-dom'
import './LandingPage.css';
import ValidationError from '../../ValidationError';


class LandingPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username:{
        value: "",
        touched: false
      },
      password:{
        value: "",
        touched:false
      },
    };
  }
  updateUsername(username) {
    this.setState({username: { value: username, touched:true }});
  }
  updatePassword(password) {
    this.setState({password: { value: password, touched:true }});
  }

  validateUsername(){
    const username = this.state.username.value.trim();
    if (username.length === 0){
      return "Username is required"
    } 
  }
  validatePassword(){
    const password = this.state.password.value.trim();
    if(password.length === 0){
      return "Password is required";
    }
  }

  handleSubmit = ev => {
    ev.preventDefault()
    console.log('submitted!')
  }


  render(){
    return (
      <main className="landingPageMain">
        <header>
          <h1>The Green Journal</h1>
          <h2>Plant parenting made easy.</h2>
        </header>
        <section>
          <h3>Your plant's diary</h3>
          <p>The Green Journal helps you keep track of your plant babies. Create a profile for each plant that saves care instructions, shows reminders and logs progress as they grow.</p>
          <Link to={`/register`} className='registerBtn'>Create an Account</Link>
        </section>
        <section>
            <form className="login-form" onSubmit={e => this.handleSubmit(e)}>
              <legend>Already have an account?</legend>
              <label for="username" >Username:</label>
              <input 
                  type="text"
                  name="username"
                  id="username"
                  onChange={e => this.updateUsername(e.target.value)}
                  aria-label="username" 
                  aria-required="true" />
              {this.state.username.touched && (<ValidationError message={this.validateUsername()} />)}
              <label for="password" >Password:</label>
              <input 
                  type="text" 
                  name="password" 
                  id="password"
                  onChange={e => this.updatePassword(e.target.value)}
                  aria-label="password" 
                  aria-required="true" />
              {this.state.password.touched && (<ValidationError message={this.validatePassword()} />)}
              <button type="submit" disabled={this.validateUsername() || this.validatePassword()}>Login</button>
            </form>
        </section>
      </main>
    );
  }
}

export default LandingPage;
