import React, { Component } from 'react';
import { Table } from 'reactstrap';
import CarItem from './CarItem';
import CarForm from './CarForm';
import FilterComponent from './FilterComponent';

  
const url = "http://localhost:1234/automobiles";


class MainPage extends Component {

    constructor(props) {
        super(props);

        this.searchCar = this.searchCar.bind(this);
        this.addCar = this.addCar.bind(this);
        this.removeCar = this.removeCar.bind(this);

        this.state = {
            cars: props.cars,
            backUpCars: props.backUpCars
        };
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
            console.log("HVA ER CAR 2: " + JSON.stringify(recivedCar))

        this.setState(s => ({
          cars: this.state.cars.concat(car)
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
    var possibleSearchResult = this.props.cars.filter(x => x.name === name);
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

        let component;

        if(this.props.auth) {
            component = (
                
                    <div className="App">
                        <div className="App-header">
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
                                {this.props.cars.map((currentCar, i) => (
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>
                                        <CarItem
                                            //key={console.log("Funker key: " + currentCar._id)}//VISER FORSKJELLIGE ID-er!...
                                            key={i}
                                            removeCar={this.removeCar}
                                            car={currentCar} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                </div>
            )
        } else {
            component = (
                <h1>Not authorized!</h1>
            )
        }


         return (
            <div>
                {component}
            </div>
         )
    }


}


export default MainPage;