import React, { Component } from 'react';
import { Table } from 'reactstrap';
import CarItem from './CarItem';
import CarForm from './CarForm';
import FilterComponent from './FilterComponent';

  
const urlAutomobiles = "http://localhost:1234/automobiles" //Needs token



class MainPage extends Component {

    constructor(props) {
        super(props);

        this.searchCar = this.searchCar.bind(this);
        this.addAutomobile = this.addAutomobile.bind(this);
        this.removeCar = this.removeCar.bind(this);
        this.getAutomobiles = this.getAutomobiles.bind(this);
        


        console.log("(MainPage)State from props: " + JSON.stringify(props.cars));

        this.state = {
            cars: [],
            backUpCars: []
        };
    }

    componentWillMount() {
        if(localStorage.token) {
            this.getAutomobiles();
        }
        this.getAutomobiles();
    }

    getAutomobiles() {
        fetch(urlAutomobiles, {
          headers: {
            'X-Token': localStorage.token,
          }
        })
        .then(res => {
          if(res.status === 200) { //NEEDS THIS CHECK BECAUSE FETCH FAILS WHILE USER IS UNAUTHENTICATED!
            return res = res.json();            
          }
        })
        .then(res => {
          this.setState({
            cars: res
          })
          
        })
        
      }

    addAutomobile(automobile) {

        fetch(urlAutomobiles, {
            method: "POST",
            headers: new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
      }),
      body: JSON.stringify(automobile)
    })
      .then(res => {
            console.log("HVA ER CAR FRA addCar MainPage: " + JSON.stringify(automobile))

        this.setState({
            cars: this.state.cars.concat(automobile)
        });
        console.log("Ble staten oppdatert: " + JSON.stringify(this.state.cars));
      })
      .catch(err => document.write(err));
  }

  removeCar(id) {

    fetch(`${urlAutomobiles}/${id}`, {
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
                                    <th scope="row"><CarForm addCar={this.addAutomobile} /></th>
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
                                {this.state.cars.map((currentCar, i) => (
                                    <tr key = {currentCar._id}>
                                        <th scope="row">1</th>
                                        <td>
                                        <CarItem
                             
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