import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import './index.css';

// import Slider from './components/Slider/Slider';

// ReactDOM.render(
//   <React.StrictMode>
//     <Slider />
//   </React.StrictMode>,
//   document.querySelector('#root')
// );

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.querySelector('#root')
);

serviceWorker.unregister();