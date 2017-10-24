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

class App extends Component {

  constructor(props) {
    super(props);
    this.authenticate = this.authenticate.bind(this);
    

    this.state = {
      authenticated: false
    };

  }

  componentWillMount() {
    
  }

  authenticate(bool) {

    console.log("authenticate(bool) ran " + bool)

    this.setState({
      authenticated: bool
    })
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
                      <LoginPage {...props} auth = {this.authenticate}/>
                    )}
                  />   


                  <Route path="/register" exact 
                    render={(props) => (
                      <RegistrationPage {...props}  auth = {this.authenticate}/>
                    )}
                  />

                  <Route path="/main" exact
                    render={(props) => (
                      <MainPage 
                        {...props} 
                        authGlobal = {this.state.authenticated} //ATTACHED TO App.js TO CHECK IF PERMISSION IS GRANTED, KINDA POOR LOGIC
                        auth = {this.authenticate} //METHOD NEEDED IN CHILD
                        />
                    )}
                  /> 

                  <Route component = { NotFoundPage }/>     

              </Switch>
            </div>
          </BrowserRouter>     
        

           
      </div>
    );
  }
}


export default App;


//<MainPage {...props} auth={this.authenticate} authenticatedResponse={this.authenticatedResponse}/>
//auth={this.state.authenticated}