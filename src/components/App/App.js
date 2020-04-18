import React from 'react';
import { Switch } from 'react-router-dom';
import './App.css';
import LandingPage from '../../routes/LandingPage/LandingPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import HomePage from '../../routes/HomePage/HomePage';
import AddPlant from '../../routes/AddPlant/AddPlant';
import PlantDetails from '../../routes/PlantDetails/PlantDetails';
import EditPlant from '../../routes/EditPlant/EditPlant';
import AddLog from '../../routes/AddLog/AddLog';
import Context from '../../Context';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';
import PlantApiService from '../../services/plant-api-service';



class App extends React.Component  {
  state= {
    plants: [],
    logs: [],
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
    
    
    this.setState({
      plants: this.state.plants.map(plant => 
        (plant.id !== Number(updatedPlant.id)) ? plant : updatedPlant
      )
    })
  }
  setLogs = logs => {
    this.setState({ logs })
  }
  deleteLog = logId => {
    this.setState({
        logs: this.state.logs.filter(log => log.id !== logId.log_id)
    });
  };
  deletePlant = plantId => {
    this.setState({
        plants: this.state.plants.filter(plant => plant.id !== plantId.plant_id)
    });
  };
  
  
  
  render(){
    const contextValue = {
      plants: this.state.plants,
      logs: this.state.logs,
      updatePlants: this.updatePlants,
      updatePlant: this.updatePlant,
      deletePlant: this.deletePlant,
      setLogs: this.setLogs,
      deleteLog: this.deleteLog,
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
            <PrivateRoute
                    path={'/add-log/:plantId'}
                    component={AddLog}
                  />
        </Switch>
        </Context.Provider>
        
      </div>
    );
  }
}

export default App;
