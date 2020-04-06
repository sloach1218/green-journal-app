import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import dummyStore from '../../dummyStore'
import LandingPage from '../../routes/LandingPage/LandingPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import HomePage from '../../routes/HomePage/HomePage';
import AddPlant from '../../routes/AddPlant/AddPlant';
import PlantDetails from '../../routes/PlantDetails/PlantDetails';
import EditPlant from '../../routes/EditPlant/EditPlant';
import Context from '../../Context';


class App extends React.Component  {
  state= {
    plants: [],
  }
  
  componentDidMount(){
    this.setState({
      plants: dummyStore.plants,
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
            <Route
                    exact
                    path={'/'}
                    component={LandingPage}
                  />
            <Route
                    path={'/register'}
                    component={RegistrationPage}
                  />
            <Route
                    path={'/home'}
                    component={HomePage}
                  />
            <Route
                    path={'/add-plant'}
                    component={AddPlant}
                  />
            <Route
                    path={'/plant/:plantId'}
                    component={PlantDetails}
                  />
            <Route
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
