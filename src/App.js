import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'


//PAGES
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import MainPage from './components/MainPage';
import NotFoundPage from './components/NotFoundPage';

//COMPONENTS
import HeaderComponent from './components/HeaderComponent';

//ROUTERS
import AppRouter from './components/routers/AppRouter';

const url = "https://api.mlab.com/api/1/databases/automobiles/collections/authenticatedUsers?apiKey=9fY51lB2S10nmmu-pZ-sF5xUJ_eYhPcL";

const testUser = {
  "username":"test3",
  "passwordHash":"testpass3"
}

class App extends Component {

  constructor(props) {
    super(props);
    this.testPost = this.testPost.bind(this);
  }

  

  testPost() {
    fetch(url, {
      method: "POST",
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify(testUser)
    })
    .then(res => {
      //Manipulate view
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <AppRouter/>
        <button onClick={this.testPost}>add user</button>

           
      </div>
    );
  }
}

export default App;


