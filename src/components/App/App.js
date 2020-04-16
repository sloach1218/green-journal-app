import React from 'react';
import { Switch } from 'react-router-dom';
import './App.css';
import LandingPage from '../../routes/LandingPage/LandingPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import HomePage from '../../routes/HomePage/HomePage';
import AddPlant from '../../routes/AddPlant/AddPlant';
import PlantDetails from '../../routes/PlantDetails/PlantDetails';
import EditPlant from '../../routes/EditPlant/EditPlant';
import Context from '../../Context';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import PlantApiService from '../../services/plant-api-service';



class App extends React.Component  {
  state= {
    plants: [],
  }
  
  componentDidMount(){
    PlantApiService.getPlants()
      .then((plants) => {
        this.setState({plants:plants});
      }).catch((err) => {
        console.error(err)
      })

  }

  updatePlants = plants => {
    this.setState({ plants: plants })
  }

  updatePlant = updatedPlant => {
    
    console.log(updatedPlant)
    
    this.setState({
      plants: this.state.plants.map(plant => 
        (plant.id !== Number(updatedPlant.id)) ? plant : updatedPlant
      )
    })
    console.log(this.state.plants)
  }
  
  
  
  render(){
    const contextValue = {
      plants: this.state.plants,
      updatePlants: this.updatePlants,
      updatePlant: this.updatePlant,
    }


    return (
      <div className='App'>
        
        <Context.Provider value={contextValue}>
        <Switch>
            <PublicOnlyRoute
                    exact
                    path={'/'}
                    component={LandingPage}
                  />
            <PublicOnlyRoute
                    path={'/register'}
                    component={RegistrationPage}
                  />
            <PrivateRoute
                    path={'/home'}
                    component={HomePage}
                  />
            <PrivateRoute
                    path={'/add-plant'}
                    component={AddPlant}
                  />
            <PrivateRoute
                    path={'/plant/:plantId'}
                    component={PlantDetails}
                  />
            <PrivateRoute
                    path={'/edit-plant-details/:plantId'}
                    component={EditPlant}
                  />
        </Switch>
        </Context.Provider>
        
      </div>
    );
  }
}

export default App;
