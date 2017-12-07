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
import { NavLink } from 'react-router-dom';
import catPic2 from '.././resources/img/401Unauthorized.jpeg';
import { subscribeToTimer } from '../socket';
import { pushToServer } from '../socket';
import io from 'socket.io-client';
import { setSocket } from '.././actions/socket';










//const url = 'ws://localhost:1234';//Web-Socket related
const socketUrl = 'http://localhost:1234';
const socket = null;


const urlAutomobiles = "http://localhost:1234/automobiles" //Needs token
const jwt = require('jwt-simple');
const secret = 'topsecret';



class MainPage extends Component {

    constructor(props) {
        super(props);

        this.addAutomobileRedux = this.addAutomobileRedux.bind(this); //REDUX
        this.removeCarRedux = this.removeCarRedux.bind(this); //REDUX
        this.getAutomobilesRedux = this.getAutomobilesRedux.bind(this); //REDUX
        this.logoutRedux = this.logoutRedux.bind(this); //REDUX
        //this.socketEvent = this.socketEvent.bind(this);
        //this.initSocket = this.initSocket.bind(this);

        this.state = {
            cars: [],
            socket: null,
            //webSocket: [], //SOCKET: WebSocket-related
            timestamp: 'no timestamp yet',
            testObject: 'empty', //SOCKET: Socket.IO-related
            socketTestData: '', //SOCKET: Socket.IO-related
        };

        
    }

    //initSocket = () => { //ORIGINAL
    /*initSocket() {
        this.socket = io(socketUrl);
        this.socket.on('connect', () => {
            console.log(`User: ${this.props.auth.username} has connected, from MainPage`);
            this.props.dispatch(setSocket({inSocket: this.socket}));

            this.props.activeSocket.inSocket.on('testEvent', () => this.setState({socketTestData: 'TestData'})); //ORIGINAL            
        });
    }*/

    componentWillMount() {

        if(this.props.auth.authenticated && !this.props.auth.visited) {

            //WEBSOCKET: Socket.IO related TRY 
            //this.initSocket();

            this.getAutomobilesRedux(); //REDUX
            this.props.dispatch(pageVisited({visited: true}));

            
        }
    }

    componentDidMount() {
        
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
                    id: userSpesificData[i]._id,
                    isPublic: userSpesificData[i].isPublic
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
            this.props.dispatch(addCar({
                carName: automobile.name, 
                id: automobile._id, 
                isPublic: automobile.isPublic
            }));
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

    makePublicOrPrivate(id){

        //this.socketEvent();// DOESNT WORK FOR SOME REASON...

        fetch(`${urlAutomobiles}/${id}`, {
            method: "PUT",
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
            })
            .then(res => {
                
            })
            .catch(err => document.write(err));
            
    }


    logoutRedux() {
        this.props.dispatch(unAuthenticateUser({userName: '', authenticated: false}));
        this.props.dispatch(clearCar());
        localStorage.token = '';
        this.props.history.push("/");
    }

    /*socketEvent() {
        this.props.activeSocket.inSocket.emit('testEvent');
    }*/

    


     render() {
       
        let component;

        if(this.props.auth.authenticated) { 
            component = (
                
                    <div className="App">
                        <div className="App-header">
                            <h2>Car wishlist</h2>
                        </div>
                        <h1>Logged in as: {this.props.auth.username}</h1>

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
                                    />
                                    </th>
                                </tr>

                            </tbody>
                        </Table>

                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Car</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.props.cars.map((currentCar, index) => (
                                    <tr key = {currentCar.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                        <CarItem
                                            removeCar={this.removeCarRedux}
                                            makePublicOrPrivate={this.makePublicOrPrivate}
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
                        <Button 
                            color="danger" 
                            onClick={this.socketEvent}>SocketEvent
                        </Button>  
                        
                </div>
            )
        } else {
            component = (
                <div className="App-header">
                    <h2>Not authorized, please 
                        <NavLink to="/" activeClassName="is-active" className="linkStyle" exact={true}>login</NavLink>
                    !</h2>
                    <img src= { catPic2 }/>                
                    
                </div> 
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
            cars: selectedCars(state.cars, state.filters),
            auth: state.auth,
            activeSocket: state.activeSocket
        };
};


export default connect(mapStateToProps)(MainPage);








//WEBSOCKET: Socket.IO related TRY 1
        /*subscribeToTimer((err, timestamp) => this.setState({ 
            timestamp: timestamp
        }));*/

        /*pushToServer((err, data) => this.setState({
            testObject: data,
        }));
        console.log("DATA FROM SOCKET IN MAIN: " + this.state.testObject);
       */ 
        

         //WEBSOCKET: WebSocket related
            /*const ws = new WebSocket(url);
            this.setState({webSocket: ws});

            ws.onopen = () => {
                console.log('Connected from client!');
            };

            ws.onmessage = message => {
                const text = message.data;
                this.setState({
                    messages: [...this.state.messages, text],
                });
            };*/ 


            /**
             * 
             * 
             * <Button 
                            color="danger" 
                            onClick={this.socketEvent}>SocketEvent
                        </Button>  
             */