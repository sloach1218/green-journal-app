import React from 'react';
import { Link } from 'react-router-dom';
import './PlantDetails.css';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import PlantsContext from '../../Context';
import {getPlant} from '../../appHelpers';
import PlantApiService from '../../services/plant-api-service';


class PlantDetails extends React.Component {
  static contextType = PlantsContext

  componentDidMount() {
    const { plantId } = this.props.match.params
    
    PlantApiService.getPlantLogs(plantId)
      .then((logs) => this.context.setLogs(logs))
      .catch(this.context.setError)

  }
  
  deleteLog(id, cb) {
    const logId ={
      log_id: id
    }
    PlantApiService.deleteLog(logId)
      .then(() => {
        this.context.deleteLog(logId)
      })
      .catch(error => {
        console.error(error)
      })
  }

  
  render() {
    
    const { plants = [] } = this.context;
    const plant = getPlant(plants, this.props.match.params.plantId) || {};
    const { logs = [] } = this.context;
    
    



    return (
        <div>
          <Header />
          <Nav />
          <main className='Plant__details'>
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
                  >Edit Details</Link>
              <img src={plant.image} alt={plant.type}/>
              <h2 className='Plant__heading'>{plant.name}</h2>
              <p><em>{plant.type}</em></p>
              <p>{plant.description}</p>
              <p>Sunlight preferred: {plant.sunlight}</p>
              <p>Water every {plant.water} days</p>
              <p>Fertilize every {plant.fertilize} weeks</p>
              <p>Repot every {plant.repot} months</p>
              <section>
                <h3>Plant Updates</h3>
                <Link 
                  to={{
                    pathname:`/add-log/${plant.id}`,
                    state: {
                      id: plant.id,
                    }
                  }}
                  className='addUpdateBtn'
                  >Add New Update</Link>
                <ul>
                {logs.map(log =>
                  <li key={log.id} className='plantLog'>
                    <p>{log.date_created.slice(0,10)}</p>
                    <p className='logText'>{log.text}</p>
                    <img src={log.image} className='logImage' alt="logUpdateImage" />
                    <button
                      className='LogDeleteBtn'
                      onClick={() =>
                        this.deleteLog(log.id)
                      }
                    >
                      Delete
                    </button>
                    
                  </li>
                )}
                </ul>
              </section>
          </main>
        </div>
      
    )
  }
}

export default PlantDetails;
