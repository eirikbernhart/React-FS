import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CarItem from './CarItem';
import CarForm from './CarForm';
import FilterComponent from './FilterComponent';
import { Table } from 'reactstrap';



const url = "http://localhost:1234/automobiles";



class App extends Component {


  constructor(props) {
    super(props);
    this.addCar = this.addCar.bind(this);
    this.removeCar = this.removeCar.bind(this);
    this.searchCar = this.searchCar.bind(this);


    this.fetchUser();
    this.state = {
      cars: [],
      backUpCars: [],
    };
  }

  fetchUser() {
    fetch(url)
      .then(response => {
       return response = response.json()
      })
      .then(res => {
        console.log("RES: " + JSON.stringify(res))
        this.setState({
        cars: res
        })
      })
      .catch(err => document.write(err));
  }


  addCar(car) {
    console.log("HVA ER CAR 1: " + JSON.stringify(car))
    let recivedCar = car
    fetch(url, {
      method: "POST",
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify(car)
    })
      .then(res => {
        //this.fetchUser();
            console.log("HVA ER CAR 2: " + JSON.stringify(recivedCar))

        this.setState(s => ({
          cars: this.state.cars.concat(car)
          //cars: this.state.cars.concat({"_id":"846564887246012600000000","name":"daw","price":1234,"__v":0})//DETTE ER TYDELIGVIS GREIT....

        }));
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
        this.setState(prevState => ({
          cars: prevState.cars.filter(x => x._id !== id)
        }));
      })
      .catch(err => document.write(err));
  }

  searchCar(name) {   
    var possibleSearchResult = this.state.cars.filter(x => x.name === name);
    if (possibleSearchResult.length > 0) {
      this.setState(x => ({
        backUpCars: this.state.cars,
        cars: possibleSearchResult,
        foundResult: true
      }));
    }
   
    if (this.state.foundResult) {
      this.setState(x => ({
        cars: this.state.backUpCars
      }));
    }
    this.state.foundResult = false;
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Car wishlist</h2>
        </div>

        <Table bordered>
          <thead>
            <tr>
              <th>Legg til</th>
              <th>Filtrer</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th scope="row"><CarForm addCar={this.addCar} /></th>
              <th scope="row"><FilterComponent
                searchCar={this.searchCar}
                />
              </th>
            </tr>

          </tbody>
        </Table>

        <Table bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
            </tr>
          </thead>

          <tbody>
            {this.state.cars.map((currentCar) => (
              <tr>
                <th scope="row">1</th>
                <td>
                  <CarItem
                    key={currentCar._id}
                    removeCar={this.removeCar}
                    car={currentCar} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );

  }

}

export default App;