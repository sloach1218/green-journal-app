import React from 'react';
import './AddLog.css';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import ValidationError from '../../ValidationError';
import PlantApiService from '../../services/plant-api-service';


class AddLog extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text:{
        value: "",
        touched: false
      },
      image:{
        value: "",
        touched:false
      },
      imageUploaded:{
        value: ''
      },
    };
  }
  updateText(text) {
    this.setState({text: { value: text, touched:true }});
  }
  updateImage(image) {
    this.setState({image: { value: image, touched:true }});
  }

  validateText(){
    const text = this.state.text.value.trim();
    if (text.length === 0){
      return "Name is required"
    } else if(text.length < 2){
      return "Name must be at least 2 characters long"
    }
  }

  handleSubmit = ev => {
    ev.preventDefault()

    const { text } = ev.target
    const plantId = this.props.location.state.id
    
    PlantApiService.imageUploader(this.state.image.value)
      .then((image) => {
        const imageUploaded = image.imageUrl

        return PlantApiService.postLog({
          text: text.value,
          image: imageUploaded,
          plant_id: plantId
        })
      })
      .then(() => {
        text.value = ''
        this.props.history.push(`/plant/${plantId}`)
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
        <form className='AddPlantForm' onSubmit={e => this.handleSubmit(e)} encType="multipart/form-data">
            <legend>Add a new update</legend>
            
            <div className='text'>
              <label htmlFor='AddLog__text'>
                Update text: 
              </label>
              <textarea
                name='text'
                type='text'
                required
                id='AddLog__text'
                onChange={e => this.updateText(e.target.value)}
                aria-label="text" 
                aria-required="true" />
                {this.state.text.touched && (<ValidationError message={this.validateText()} />)}
            </div>
            <div className='updateImg'>
              <label htmlFor='AddPlantForm__profileImg'>
                Select an image: 
              </label>
              <input
                name='image'
                type='file'
                id='image'
                onChange={e => this.updateImage(e.target.files[0])}
                aria-label="image" 
                required
                />
            </div>
            <button type='submit'>Add Log</button>
  
        </form>
      </div>
    );
  }
}

export default AddLog;
