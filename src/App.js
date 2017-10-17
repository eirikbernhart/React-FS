import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'


//PAGES
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import MainPage from './components/MainPage';
import NotFoundPage from './components/NotFoundPage';

//COMPONENTS
import HeaderComponent from './components/HeaderComponent';

//ROUTERS
//import AppRouter from './components/routers/AppRouter'; //ADDED MORE COMPLEXITY

const urlRemote = "https://api.mlab.com/api/1/databases/automobiles/collections/authenticatedUsers?apiKey=9fY51lB2S10nmmu-pZ-sF5xUJ_eYhPcL";
const urlNewUser = "http://localhost:1234/users"


const testUser = {
  "username":"testuser",
  "passwordHash":"testpass"
}

const authenticatedResponse = '';



class App extends Component {

  constructor(props) {
    super(props);
    this.testPost = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.registerUser = this.registerUser.bind(this);

    this.state = {
      authenticated: false
      //cars: [],
      //backUpCars: [],
    };

  }

  componentWillMount() {
    
  }

  //LETS USER NAVIGATE TO MAINPAGE
  

  
    
  

  
  

   registerUser() {
      fetch(urlNewUser, {
        method: "POST",
        headers: new Headers({
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }),
        body: JSON.stringify(testUser)
      })
      .then(res => res.text())
      .then(token => {
        localStorage.token = token
        console.log("Token from client: " + token);
        this.setState({
          authenticated: true
        })
      });
    }

    loginUser() {
      console.log("loginUser from app.js")
    }

    
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <BrowserRouter>
          <div>
            <HeaderComponent/>
              <Switch>

                  <Route path="/" exact 
                    render={(props) => (
                      <LoginPage {...props} loginUser={this.loginUser} auth={this.state.authenticated}/>
                    )}
                  />   

                  <Route path="/register" component = { RegistrationPage }/> 

                  <Route path="/main" exact
                    render={(props) => (
                      <MainPage {...props} auth={this.state.authenticated} authenticatedResponse={this.authenticatedResponse}/>
                    )}
                  /> 

                  <Route component = { NotFoundPage }/>     

              </Switch>
            </div>
          </BrowserRouter>     
        <button onClick={this.registerUser}>add user</button> 

           
      </div>
    );
  }
}


export default App;


