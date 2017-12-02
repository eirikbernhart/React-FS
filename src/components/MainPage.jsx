import React, { Component } from 'react';
import { Table } from 'reactstrap';
import CarItem from './CarItem';
import CarForm from './CarForm';
import FilterComponent from './FilterComponent';
import { Button } from 'reactstrap';
import configureStore from '.././store/configureStore';
import { addCar } from '.././actions/cars';
import { removeCar } from '.././actions/cars';
import { clearCar } from '.././actions/cars';
import { searchCar } from '.././actions/cars';
import { connect } from 'react-redux';
import { authenticateUser } from '../actions/auth';
import { unAuthenticateUser } from '../actions/auth';
import { pageVisited } from '../actions/auth';
import selectedCars from '../selectors/cars';



//import getVisibleCars from '../selectors/cars';




const urlAutomobiles = "http://localhost:1234/automobiles" //Needs token
const jwt = require('jwt-simple');
const secret = 'topsecret';
//const store = configureStore();


class MainPage extends Component {

    constructor(props) {
        super(props);

        this.addAutomobileRedux = this.addAutomobileRedux.bind(this); //REDUX
        this.removeCarRedux = this.removeCarRedux.bind(this); //REDUX
        this.getAutomobilesRedux = this.getAutomobilesRedux.bind(this); //REDUX
        this.logoutRedux = this.logoutRedux.bind(this); //REDUX


       

        this.state = {
            cars: [],
        };
    }

    componentWillMount() {
        if(this.props.auth.authenticated && !this.props.auth.visited) {
            this.getAutomobilesRedux(); //REDUX
            this.props.dispatch(pageVisited({visited: true}));
        }
    }

    componentWillUnmount() {
        //localStorage.token = '';
    }

    getAutomobilesRedux() {
        const user = jwt.decode(localStorage.token, secret)
        const url = "http://localhost:1234/automobiles/cars" 

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
            var userSpesificData = res.filter(x => x.owner === user.username)

            for(var i = 0; i < userSpesificData.length; i++) {
                this.props.dispatch(addCar({
                    carName: userSpesificData[i].name,
                    id: userSpesificData[i]._id
                }))
            }
        })
    }

    addAutomobileRedux(automobile) {
            fetch(urlAutomobiles, {
                method: "POST",
                headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
        }),
        body: JSON.stringify(automobile)
        })
        .then(res => {
            this.props.dispatch(addCar({carName: automobile.name, id: automobile._id}));
            console.log("Ble staten oppdatert: " + JSON.stringify(this.state.cars));
        })
        .catch(err => document.write(err));
    }

    removeCarRedux(id) {

        fetch(`${urlAutomobiles}/${id}`, {
        method: "DELETE",
        headers: new Headers({
            'Content-Type': 'application/json',
            Accept: 'application/json',
        }),
        })
        .then(res => {
            this.props.dispatch(removeCar({id: id}))
        })
        .catch(err => document.write(err));
    }

    logoutRedux() {
        this.props.dispatch(unAuthenticateUser({userName: '', authenticated: false}));
        this.props.dispatch(clearCar());
        localStorage.token = '';
        this.props.history.push("/");
    }

    


     render() {
       
        let component;

        if(this.props.auth.authenticated) { 
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
                                    <th scope="row"><CarForm addCar={this.addAutomobileRedux} /></th>
                                    <th scope="row"><FilterComponent
                                        searchCar={this.searchCarRedux}
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
                                {this.props.cars.map((currentCar) => (
                                    <tr key = {currentCar.carName}>
                                        <th scope="row">1</th>
                                        <td>
                                        <CarItem
                                            removeCar={this.removeCarRedux}
                                            car={currentCar} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Button 
                        color="danger" 
                        onClick={this.logoutRedux}>Log out
                    </Button>  
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

function mapStateToProps(state) {
        return {
            //cars: state.cars, //ORIGINAL
            cars: selectedCars(state.cars, state.filters),
            auth: state.auth
        };
};


export default connect(mapStateToProps)(MainPage);