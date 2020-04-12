import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from '../../routes/LandingPage/LandingPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import HomePage from '../../routes/HomePage/HomePage';
import AddPlant from '../../routes/AddPlant/AddPlant';
import PlantDetails from '../../routes/PlantDetails/PlantDetails';
import EditPlant from '../../routes/EditPlant/EditPlant';
import Context from '../../Context';
import config from '../../config';
import TokenService from '../../services/token-service';
import PrivateRoute from '../Utils/PrivateRoute';
import PublicOnlyRoute from '../Utils/PublicOnlyRoute';



class App extends React.Component  {
  state= {
    plants: [],
  }
  
  componentDidMount(){
    fetch(config.API_PLANTS_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization':`bearer ${TokenService.getAuthToken()}`,
      }
    }).then(response => response.json())
    .then((plants) => {
      this.setState({plants:plants});
    }).catch((err) => {
      console.error(err)
    })

  }
  
  
  
  render(){
    const contextValue = {
      plants: this.state.plants,
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
