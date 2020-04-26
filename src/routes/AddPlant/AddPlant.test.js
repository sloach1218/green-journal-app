import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AddPlant from './AddPlant';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><AddPlant /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
