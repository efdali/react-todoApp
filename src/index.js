import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {TodoProvider} from './context'
ReactDOM.render(
  <TodoProvider>
  <App />
  </TodoProvider>,
  document.getElementById('root')
);
