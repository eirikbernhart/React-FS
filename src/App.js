import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import img from './ensten.jpg';

class App extends Component {

  
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }



  
  render() {
    return (

        <div className="App img1">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="img1" />
          <h2>Eiriks bs page</h2>
        </div>
        <div>
          <input 
            placeholder="Brukernavn" 
            onChange={e => {
              this.setState({
                username: e.target.value,
              });
               console.log(e.target.value)
            }}
          />
        </div>
        <div>
          <input 
            placeholder="Passord"
             onChange={e => {
              this.setState({
                password: e.target.value,
              });
              console.log(e.target.value)
            }}
          />
        </div>
        <div>
          <input placeholder="Passord igjen"/>
        </div>
        <div>
          <input placeholder="...og igjen, bare for f..."/>
        </div>
        <div>
        <p>Løs differensiallikningen</p>
          <input placeholder="x(t)=Ce5t+35."></input>
        </div>
        <p>Haru lest EULA-en?!</p>
        Ja
          <input type="checkbox"></input>
        <div>
          <button
            onClick={() => {
              const username = this.state.username;
              const password = this.state.password;
              alert(`brukernavn: ${username}, passord: ${password}`);
            }}
          >
          Logg inn
          </button>
        </div>
      </div>
    );
  }
}

export default App;
