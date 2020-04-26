import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import EditPlant from './EditPlant';

const plant = 
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
;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><EditPlant location={{state:plant}} /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
