import React from 'react';
import './AddPlant.css';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import ValidationError from '../../ValidationError';
import PlantApiService from '../../services/plant-api-service';


class AddPlant extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name:{
        value: "",
        touched: false
      },
      type:{
        value: "",
        touched:false
      },
      description:{
        value: "",
        touched:false
      },
      sunlight:{
        value: "Bright",
        touched:false
      },
      water:{
        value: "",
        touched:false
      },
      fertilize:{
        value: "",
        touched:false
      },
      repot:{
        value: "",
        touched:false
      },
      image:{
        value: "",
        touched:false
      },
    };
  }
  updateName(name) {
    this.setState({name: { value: name, touched:true }});
  }
  updateType(type) {
    this.setState({type: { value: type, touched:true }});
  }
  updateDescription(description) {
    this.setState({description: { value: description, touched:true }});
  }
  updateSunlight(sunlight) {
    console.log(sunlight)
    this.setState({sunlight: { value: sunlight, touched:true }});
  }
  updateWater(water) {
    this.setState({water: { value: water, touched:true }});
  }
  updateFertilizer(fertilize) {
    this.setState({fertilize: { value: fertilize, touched:true }});
  }
  updateRepot(repot) {
    this.setState({repot: { value: repot, touched:true }});
  }
  updateImage(image) {
    this.setState({image: { value: image, touched:true }});
  }

  validateName(){
    const name = this.state.name.value.trim();
    if (name.length === 0){
      return "Name is required"
    } else if(name.length < 2){
      return "Name must be at least 2 characters long"
    }
  }
  validateType(){
    const type = this.state.type.value.trim();
    if(type.length === 0){
      return "Type is required";
    } else if ( type.length < 5){
      return "Type must be at least 5 characters long"
    }
  }
  validateDescription(){
    const description = this.state.description.value.trim();
    if(description.length === 0){
      return "Description is required";
    } else if ( description.length < 5){
      return "Description must be at least 5 characters long"
    }
  }
  
  validateWater(){
    const water = this.state.water.value.trim();
    if(water.length === 0){
      return "Water preferrred is required";
    } else if ( water.length > 3){
      return "Too many characters entered"
    }
  }
  validateFertilizer(){
    const fertilize = this.state.fertilize.value.trim();
    if(fertilize.length === 0){
      return "Fertilizer preferrred is required";
    } else if ( fertilize.length > 3){
      return "Too many characters entered"
    }
  }
  validateRepot(){
    const repot = this.state.repot.value.trim();
    if(repot.length === 0){
      return "Repotting preferrred is required";
    } else if ( repot.length > 2){
      return "Too many characters entered"
    }
  }

  handleSubmit = ev => {
    ev.preventDefault()

    const { name, type, description, sunlight, water, fertilize, repot, image  } = ev.target
    
    const imageFiller = image.value || 'https://live.staticflickr.com/65535/48245873492_100da3b527_b.jpg'
    
    this.setState({ error: null })
    PlantApiService.postPlant({
      name: name.value,
      type: type.value,
      description: description.value,
      sunlight: sunlight.value,
      water: water.value,
      fertilize: fertilize.value,
      repot: repot.value,
      image: imageFiller,
    })
      .then(plant => {
        name.value = ''
        type.value = ''
        description.value = ''
        sunlight.value = ''
        water.value = ''
        fertilize.value = ''
        repot.value = ''
        window.location.href = '/home'
      })
      .catch(res => {
        this.setState({ error: res.error })
      })


  }

  render(){
    return (
      <div  className="addPlantPage">
        <Header />
        <Nav />
        <form className='AddPlantForm' onSubmit={e => this.handleSubmit(e)}>
            <legend>Add a new plant</legend>
            <div className='name'>
              <label htmlFor='AddPlantForm__name'>
                Name: 
              </label>
              <input
                name='name'
                type='text'
                required
                id='AddPlantForm__name'
                onChange={e => this.updateName(e.target.value)}
                aria-label="Name" 
                aria-required="true" />
              {this.state.name.touched && (<ValidationError message={this.validateName()} />)}
            </div>
            <div className='type'>
              <label htmlFor='AddPlantForm__type'>
                Plant Type: 
              </label>
              <input
                name='type'
                type='text'
                required
                id='AddPlantForm__type'
                onChange={e => this.updateType(e.target.value)}
                aria-label="type" 
                aria-required="true" />
              {this.state.type.touched && (<ValidationError message={this.validateType()} />)}
            </div>
            <div className='description'>
              <label htmlFor='AddPlantForm__description'>
                Description/Care Details: 
              </label>
              <textarea
                name='description'
                type='text'
                required
                id='AddPlantForm__description'
                onChange={e => this.updateDescription(e.target.value)}
                aria-label="description" 
                aria-required="true" />
                {this.state.description.touched && (<ValidationError message={this.validateDescription()} />)}
            </div>
            <div className='sunlight'>
              <label htmlFor='AddPlantForm__sunlight'>
                Sunlight Preferred: 
              </label>
              <select name='sunlight' value={this.state.sunlight.value} onChange={e => this.updateSunlight(e.target.value)}>
                  <option value="Low" key="Low">Low/full shade</option>
                  <option value="Partial" key="Partial">Partial sunlight and shade</option>
                  <option value="Bright" key="Bright">Bright without direct sun</option>
                  <option value="Direct" key="Direct">Direct full sun</option>
              </select>
            </div>
            <div className='water'>
              <label htmlFor='AddPlantForm__water'>
                Water every: 
              </label>
              <input
                name='water'
                type='number'
                required
                id='AddPlantForm__water'
                onChange={e => this.updateWater(e.target.value)}
                aria-label="water" 
                aria-required="true"
                placeholder="7" />
                <span> Days</span>
              {this.state.water.touched && (<ValidationError message={this.validateWater()} />)}
            </div>
            <div className='fertilize'>
              <label htmlFor='AddPlantForm__fertilize'>
                Fertilize every: 
              </label>
              <input
                name='fertilize'
                type='number'
                required
                id='AddPlantForm__fertilize'
                onChange={e => this.updateFertilizer(e.target.value)}
                aria-label="fertilize" 
                aria-required="true"
                placeholder="2" />
                <span> Weeks</span>
              {this.state.fertilize.touched && (<ValidationError message={this.validateFertilizer()} />)}
            </div>
            <div className='repot'>
              <label htmlFor='AddPlantForm__repot'>
                Repot every: 
              </label>
              <input
                name='repot'
                type='number'
                required
                id='AddPlantForm__repot'
                onChange={e => this.updateRepot(e.target.value)}
                aria-label="repot" 
                aria-required="true"
                placeholder="6" />
                <span> Months</span>
              {this.state.repot.touched && (<ValidationError message={this.validateRepot()} />)}
            </div>
            <div className='profileImg'>
              <label htmlFor='AddPlantForm__profileImg'>
                Upload a profile image: 
              </label>
              <input
                name='image'
                type='file'
                id='AddPlantForm__image'
                onChange={e => this.updateImage(e.target.value)}
                aria-label="image" 
                aria-required="true"
                />
            </div>
            <button type='submit'>Add Plant</button>
  
        </form>
      </div>
    );
  }
}

export default AddPlant;
