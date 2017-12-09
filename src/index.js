import React, { Component } from 'react';
import { render } from 'react-dom';
import 'core-js/es6/map';
import 'core-js/es6/set';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
