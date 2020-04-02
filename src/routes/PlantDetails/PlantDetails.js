import React from 'react';
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
              <button>Edit Details</button>
              <img src={plant.image} alt={plant.type}/>
              <h2 className='Plant__heading'>{plant.name}</h2>
              <p><em>{plant.type}</em></p>
              <p>{plant.description}</p>
          </main>
        </div>
      
    )
  }
}

export default PlantDetails;
