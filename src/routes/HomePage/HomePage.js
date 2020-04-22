import React from 'react';
import { Link } from 'react-router-dom'
import './HomePage.css';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import PlantListItem from '../../components/PlantListItem/PlantListItem';
import PlantsContext from '../../Context';
import PlantApiService from '../../services/plant-api-service';


class HomePage extends React.Component {
  static contextType = PlantsContext

  componentDidMount(){
    PlantApiService.getPlants()
      .then((plants) => {
        this.context.updatePlants(plants)
      }).catch((err) => {
        console.error(err)
      })

  }
  

  renderPlants() {
    const { plants = [] } = this.context;
    if(plants.length === 0){
      return(<Link to={{pathname:`/add-plant`}} className="AddPlantCTA">Ready to start your green journal?<br></br>Add Your First Plant Here!</Link>)
      
    } else {
      return plants.map(plant =>
        <PlantListItem
          key={plant.id}
          plant={plant}
        />
      )
    }
    
  }

  render(){
    return (
      <div>
        <Header />
        <Nav />
        <div className="plantListContainer">
          {this.renderPlants()}
        </div>
        
      </div>
    );
  }
}

export default HomePage;
