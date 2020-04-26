import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import PlantDetails from './PlantDetails';
import PlantsContext from '../../Context';


const plants = [
  {
    id: 1,
    name: 'Planty',
    type: 'plantlike',
    description: 'likes water and sun, but not too much',
    sunlight: 'Bright',
    water: 6,
    fertilize: 4,
    repot: 12,
    image: 'plant.jpg',
  }
];


it('renders without crashing', () => {
  const div = document.createElement('div');
  
  ReactDOM.render(<Router><PlantsContext.Provider value={{plants}}><PlantDetails  match={{params: {plantId: 1}, isExact: true, path: "", url: ""}}/></PlantsContext.Provider></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
