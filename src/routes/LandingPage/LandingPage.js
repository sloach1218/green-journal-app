import React from 'react';
import './LandingPage.css';


class LandingPage extends React.Component {
  

  render(){
    return (
      <main className="landingPageMain">
        <header>
          <h1>The Green Journal</h1>
          <h2>Plant parenting made easy.</h2>
        </header>
        <section>
          <h3>Your plant's diary</h3>
          <p>The Green Journal helps you keep track of your plant babies. Create a profile for each plant that saves care instructions, reminders and log progress as they grow.</p>
          <button>Create an Account</button>
        </section>
        <section>
            <header>
              <h3>Login Now</h3>
            </header>
            <form className="signup-form">
              <label for="username" >Username:</label>
              <input type="text" name="username" id="username" />
              <label for="password" >Password:</label>
              <input type="text" name="password" id="password" />
              

            </form>

        </section>
      </main>
    );
  }
}

export default LandingPage;
