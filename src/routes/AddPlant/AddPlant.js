import React from 'react';
import './AddPlant.css';
import Header from '../../components/Header/Header'
import Nav from '../../components/Nav/Nav'


class AddPlant extends React.Component {

  handleSubmit = ev => {
    ev.preventDefault()
    console.log('submitted!')
  }

  render(){
    return (
      <div>
        <Header />
        <Nav />
        <form className='AddPlantForm' onSubmit={this.handleSubmit}>
            <div className='name'>
              <label htmlFor='AddPlantForm__name'>
                Name: 
              </label>
              <input
                name='name'
                type='text'
                required
                id='AddPlantForm__name' />
            </div>
            <div className='type'>
              <label htmlFor='AddPlantForm__type'>
                Plant Type: 
              </label>
              <input
                name='type'
                type='text'
                required
                id='AddPlantForm__type' />
            </div>
            <div className='description'>
              <label htmlFor='AddPlantForm__type'>
                Description/Care Details: 
              </label>
              <textarea
                name='description'
                type='text'
                required
                id='AddPlantForm__description' />
            </div>
            <button type='submit'>Add Plant</button>
  
        </form>
      </div>
    );
  }
}

export default AddPlant;
