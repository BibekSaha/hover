import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import Store from './store';
import INITIAL_STATE from './store/__init__';
import * as serviceWorker from './serviceWorker';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Store state={INITIAL_STATE}>
      <App />
    </Store>
  </React.StrictMode>,
  document.querySelector('#root')
);

serviceWorker.unregister();