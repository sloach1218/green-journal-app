import React from 'react';
import './HomePage.css';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import PlantListItem from '../../components/PlantListItem/PlantListItem'
import PlantsContext from '../../Context'


class HomePage extends React.Component {
  static contextType = PlantsContext

  

  renderPlants() {
    const { plants = [] } = this.context;
    return plants.map(plant =>
      <PlantListItem
        key={plant.id}
        plant={plant}
      />
    )
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
