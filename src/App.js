import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CarItem from './CarItem';
import CarForm from './CarForm';


const url = "http://localhost:1234/automobiles";



class App extends Component {


  constructor(props) {
    super(props);
    this.addCar = this.addCar.bind(this);
    this.removeCar = this.removeCar.bind(this);
    //this.fetchUser = this.bind(this);
    this.fetchUser();
    this.state = {
      cars: []
    };


  }

  fetchUser() {
    fetch(url)
      .then(response => response.json())
      .then(res => this.setState({
        cars: res
      }))
      .catch(err => document.write(err));
  }


  addCar(car) {
    fetch(url, {
      method: "POST",
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify(car)
    })
      .then(res => {
        this.fetchUser();
      })
      .catch(err => document.write(err));
  }

  removeCar(id) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    })
      .then(res => {
        this.fetchUser();
      })
      .catch(err => document.write(err));
  }

  //NEW IMPLEMENTATION
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Car wishlist</h2>
        </div>

        <div>
          <CarForm addCar={this.addCar} />
        </div>
        {
          <ul>
            {this.state.cars.map((currentCar) => (
              <CarItem car={currentCar}
                removeCar={this.removeCar}
                />
            ))}
          </ul>
        }
      </div>
    );
  }

  //ORIGINAL
  /*render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Car wishlist</h2>
        </div>

        <div>
          <CarForm addCar={this.addCar} />
        </div>


        <div>
          <ul>
            {this.state.car.map((currentCar) => (
              <CarItem car={currentCar} />
            ))}
          </ul>
        </div>
      </div>
    );
  }*/
}

export default App;