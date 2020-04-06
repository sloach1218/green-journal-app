import React from 'react';
import { Link } from 'react-router-dom';
import './PlantDetails.css';
import Header from '../../components/Header/Header'
import Nav from '../../components/Nav/Nav'
import PlantsContext from '../../Context'
import {getPlant} from '../../appHelpers'


class PlantDetails extends React.Component {
  static contextType = PlantsContext

  
  
  render() {
    
    const { plants = [] } = this.context;
    const plant = getPlant(plants, this.props.match.params.plantId)

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
                      id: plant.id
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
          </main>
        </div>
      
    )
  }
}

export default PlantDetails;
