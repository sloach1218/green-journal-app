import React from 'react';
import './EditPlant.css';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import PlantsContext from '../../Context'
import ValidationError from '../../ValidationError';
import PlantApiService from '../../services/plant-api-service';




class EditPlant extends React.Component {
  static contextType = PlantsContext
  
  constructor(props){
    super(props);
    const plant = this.props.location.state;
    this.state = {
      name:{
        value: plant.name,
        touched: false
      },
      type:{
        value: plant.type,
        touched:false
      },
      description:{
        value: plant.description,
        touched:false
      },
      sunlight:{
        value: plant.sunlight,
        touched:false
      },
      water:{
        value: plant.water,
        touched:false
      },
      fertilize:{
        value: plant.fertilize,
        touched:false
      },
      repot:{
        value: plant.repot,
        touched:false
      },
      image:{
        value: plant.image,
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

  handleSubmit = e => {
    e.preventDefault()
    const { plantId } = this.props.match.params
    const { name, type, description, water, fertilize, repot } = e.target
    const newPlant = {
      id: Number(plantId),
      name: name.value,
      type: type.value,
      description: description.value,
      sunlight: this.state.sunlight.value,
      water: water.value,
      fertilize: fertilize.value,
      repot: repot.value,
      image: this.state.image.value,
}
    if (newPlant.image === undefined || newPlant.image === ""){
      const image = this.props.location.state.existingImage
      newPlant.image = image
        PlantApiService.updatePlant(newPlant)
        .then(
          PlantApiService.getPlants()
          .then(() => {
            this.context.updatePlant(newPlant)
          })
        )
        .then(() => {
          this.props.history.push(`/plant/${plantId}`)
        })
        .catch(error => {
          console.error(error)
          this.setState({ error })
        })
    } else {
      PlantApiService.imageUploader(this.state.image.value)
        .then((image) => {
          const imageUploaded = image.imageUrl
          newPlant.image = imageUploaded;

          return PlantApiService.updatePlant(newPlant)
        })
        .then(() => {
          this.context.updatePlant(newPlant)
          this.props.history.push(`/plant/${plantId}`)
        })
        .catch(res => {
          this.setState({ error: res.error })
        })
    }
  }
  handleClickCancel = () => {
    const plantId = this.props.location.state.id
    this.props.history.push(`/plant/${plantId}`)
  };

  render(){

    return (
      <div  className="editPlantPage">
        <Header />
        <Nav />
        <form className='editPlantForm' onSubmit={e => this.handleSubmit(e)}>
            <legend>Edit your plant's details</legend>
            <div className='name'>
              <label htmlFor='editPlantForm__name'>
                Name: 
              </label>
              <input
                name='name'
                type='text'
                required
                id='editPlantForm__name'
                onChange={e => this.updateName(e.target.value)}
                aria-label="Name" 
                aria-required="true"
                value={this.state.name.value} />
              {this.state.name.touched && (<ValidationError message={this.validateName()} />)}
            </div>
            <div className='type'>
              <label htmlFor='editPlantForm__type'>
                Plant Type: 
              </label>
              <input
                name='type'
                type='text'
                required
                id='editPlantForm__type'
                onChange={e => this.updateType(e.target.value)}
                aria-label="type" 
                aria-required="true"
                value={this.state.type.value} />
              {this.state.type.touched && (<ValidationError message={this.validateType()} />)}
            </div>
            <div className='description'>
              <label htmlFor='editPlantForm__description'>
                Description/Care Details: 
              </label>
              <textarea
                name='description'
                type='text'
                required
                id='editPlantForm__description'
                onChange={e => this.updateDescription(e.target.value)}
                aria-label="description" 
                aria-required="true"
                value={this.state.description.value} />
                {this.state.description.touched && (<ValidationError message={this.validateDescription()} />)}
            </div>
            <div className='sunlight'>
              <label htmlFor='editPlantForm__sunlight'>
                Sunlight Preferred: 
              </label>
              <select name='editPlantForm__sunlight' value={this.state.sunlight.value} onChange={e => this.updateSunlight(e.target.value)}>
                  <option value="Low" key="Low">Low/full shade</option>
                  <option value="Partial" key="Partial">Partial sunlight and shade</option>
                  <option value="Bright" key="Bright">Bright without direct sun</option>
                  <option value="Direct" key="Direct">Direct full sun</option>
              </select>
            </div>
            <div className='water'>
              <label htmlFor='editPlantForm__water'>
                Water every: 
              </label>
              <input
                name='water'
                type='number'
                required
                id='editPlantForm__water'
                onChange={e => this.updateWater(e.target.value)}
                aria-label="water" 
                aria-required="true"
                value={this.state.water.value} />
                <span> Days</span>
              {this.state.water.touched && (<ValidationError message={this.validateWater()} />)}
            </div>
            <div className='fertilize'>
              <label htmlFor='editPlantForm__fertilize'>
                Fertilize every: 
              </label>
              <input
                name='fertilize'
                type='number'
                required
                id='editPlantForm__fertilize'
                onChange={e => this.updateFertilizer(e.target.value)}
                aria-label="fertilize" 
                aria-required="true"
                value={this.state.fertilize.value} />
                <span> Weeks</span>
              {this.state.fertilize.touched && (<ValidationError message={this.validateFertilizer()} />)}
            </div>
            <div className='repot'>
              <label htmlFor='editPlantForm__repot'>
                Repot every: 
              </label>
              <input
                name='repot'
                type='number'
                required
                id='editPlantForm__repot'
                onChange={e => this.updateRepot(e.target.value)}
                aria-label="repot" 
                aria-required="true"
                value={this.state.repot.value} />
                <span> Months</span>
              {this.state.repot.touched && (<ValidationError message={this.validateRepot()} />)}
            </div>
            <div className='profileImg'>
              <label htmlFor='AddPlantForm__profileImg'>
                Change profile image: 
              </label>
              <input
                name='image'
                type='file'
                id='AddPlantForm__image'
                onChange={e => this.updateImage(e.target.files[0])}
                aria-label="image" 
                aria-required="true"
                />
            </div>
            <button type='button' onClick={this.handleClickCancel} className="editPlantCancelBtn">
              Cancel
            </button>
            <button type='submit'>Update Plant Details</button>
  
        </form>
      </div>
    );
  }
}

export default EditPlant;
