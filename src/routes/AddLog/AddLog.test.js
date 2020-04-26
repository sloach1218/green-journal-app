import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AddLog from './AddLog';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><AddLog /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
