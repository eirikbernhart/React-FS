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
import io from 'socket.io-client';
import { setSocket } from './actions/socket';


const socketUrl = 'http://localhost:1234';
const socket = null;
const urlRemote = "https://api.mlab.com/api/1/databases/automobiles/collections/authenticatedUsers?apiKey=9fY51lB2S10nmmu-pZ-sF5xUJ_eYhPcL";
const store = configureStore();

export class App extends Component {

  constructor(props) {
    super(props);

    this.initSocket = this.initSocket.bind(this);

    this.initSocket();

  }

   //initSocket = () => { //ORIGINAL
   initSocket() {
        this.socket = io(socketUrl);
        this.socket.on('connect', () => {
            store.dispatch(setSocket({inSocket: this.socket}));
            //this.props.activeSocket.inSocket.on('testEvent', () => this.setState({socketTestData: 'TestData'})); //ORIGINAL            
        });
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


