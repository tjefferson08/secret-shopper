import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppBs from './App.bs';
import registerServiceWorker from './registerServiceWorker';

const App = AppBs.jsComponent;

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
