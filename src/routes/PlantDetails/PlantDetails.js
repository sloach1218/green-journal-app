import React from 'react';
import { Link } from 'react-router-dom';
import './PlantDetails.css';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import PlantsContext from '../../Context';
import {getPlant} from '../../appHelpers';
import PlantApiService from '../../services/plant-api-service';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faTint, faPencilAlt, faTrash, faEdit, faTimes, faPumpSoap } from '@fortawesome/free-solid-svg-icons';
import planterIcon from '../../images/planterIcon.png'


class PlantDetails extends React.Component {
  static contextType = PlantsContext

  state= {
    showModal: false,
    modalImg: null,
  }

  
  componentDidMount() {
    const { plantId } = this.props.match.params
    
    PlantApiService.getPlants()
      .then((plants) => {
        this.context.updatePlants(plants)
      }).catch((err) => {
        console.error(err)
      })


    PlantApiService.getPlantLogs(plantId)
      .then((logs) => this.context.setLogs(logs))
      .catch(this.context.setError)

      
  }
  
  
  deleteLog(id) {
    const logId = { log_id: id }
    PlantApiService.deleteLog(logId)
      .then(() => {
        this.context.deleteLog(logId)
      })
      .catch(error => {
        console.error(error)
      })
  }

  deletePlant(id) {
    const plantId ={
      plant_id: id
    }
    PlantApiService.deletePlant(plantId)
      .then(() => {
        window.location.href = '/home'

      })
      .catch(error => {
        console.error(error)
      })
  }

  openModal(img){
    this.setState({showModal:true, modalImg:img})
  }
  hideModal(){
    this.setState({showModal:false})
  }

  
  render() {
    
    const { plants = [] } = this.context;
    const plant = getPlant(plants, this.props.match.params.plantId) || {};
    
    const { logs = [] } = this.context;
    
    return (
        <div>
          <Header />
          <Nav />
          <div className="plantDetailsCont">
          <main className='Plant__details'>
              
              
              <img src={plant.image} alt={plant.type}/>
              <h2 className='Plant__heading'>{plant.name}</h2>
              <p className="plantType"><em>{plant.type}</em></p>
              <p className="plantDescrip">{plant.description}</p>
              <p><FontAwesomeIcon icon={faSun} className="detailsIconSun"/> {plant.sunlight} sunlight</p>
              <p><FontAwesomeIcon icon={faTint} className="detailsIcon"/> water every {plant.water} days</p>
              <p><FontAwesomeIcon icon={faPumpSoap} className="detailsIcon"/> fertilize every {plant.fertilize} weeks</p>
              <p><img src={planterIcon} className="planterIcon" alt="planter icon"/> repot every {plant.repot} months</p>
              
              <Link 
                  to={{
                    pathname:`/edit-plant-details/${plant.id}`,
                    state: {
                      name: plant.name,
                      type: plant.type,
                      description: plant.description,
                      sunlight: plant.sunlight,
                      water: plant.water,
                      fertilize: plant.fertilize,
                      repot: plant.repot,
                      id: plant.id,
                      existingImage: plant.image,
                    }
                  }}
                  className='editBtn'
                  ><FontAwesomeIcon icon={faEdit} className="detailsIcon"/> Edit Details</Link>
              <button
                  className='PlantDeleteBtn'
                  onClick={() =>
                    this.deletePlant(plant.id)
                  }
                  ><FontAwesomeIcon icon={faTrash} className="detailsIcon"/> Delete Plant
              </button>
          </main>
          <section className="plantUpdates">
                <h3>Updates</h3>
                <Link 
                  to={{
                    pathname:`/add-log/${plant.id}`,
                    state: {
                      id: plant.id,
                    }
                  }}
                  className='addUpdateBtn'
                  ><FontAwesomeIcon icon={faPencilAlt} className="detailsIcon"/> Add Update</Link>
                <ul>
                {logs.map(log =>
                  <li key={log.id} className='plantLog'>
                    
                    <p className='logText'>{log.text}</p>
                    {log.image && <img src={log.image} className='logImage' alt="logUpdateImage" onClick={() => this.openModal(log.image)}/>}
                    <p className="logDate"><em>{moment(log.date_created.slice(0,10)).format('MM/DD/YYYY')}</em></p>
                    <button
                      className='LogDeleteBtn'
                      onClick={() =>
                        this.deleteLog(log.id)
                      }
                    >
                      <FontAwesomeIcon icon={faTrash} className="detailsIcon"/> Delete
                    </button>
                    
                  </li>
                )}
                </ul>
              </section>
              </div>
              {this.state.showModal && <div className='imageModalCont' onClick={() => this.hideModal()}><FontAwesomeIcon icon={faTimes} className="modalIcon"/><img src={this.state.modalImg} alt="modalImg"/></div>}
        </div>
      
    )
  }
}

export default PlantDetails;
