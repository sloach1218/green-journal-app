import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';

import PlantListItem from './PlantListItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const plant = {
    id: 2,
    name: 'Planty',
    image: 'image.jpg'
  };
  ReactDOM.render(<Router><PlantListItem plant={plant}/></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
