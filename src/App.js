import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import MainPage from './components/MainPage';
import NotFoundPage from './components/NotFoundPage';
import HeaderComponent from './components/HeaderComponent';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';

const urlRemote = "https://api.mlab.com/api/1/databases/automobiles/collections/authenticatedUsers?apiKey=9fY51lB2S10nmmu-pZ-sF5xUJ_eYhPcL";

const store = configureStore();

class App extends Component {

  constructor(props) {
    super(props);
    
  }


  render() {
    return (
      <div className="App">
       
        <Provider store={store}>
          <AppRouter />
        </Provider>
        

           
      </div>
    );
  }
}


export default App;


