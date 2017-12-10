import React, { Component } from 'react';
import './CarForm.css'

const jwt = require('jwt-simple');
const secret = 'topsecret';

class CarForm extends Component {
    constructor(props) {
        super(props);

        const user = jwt.decode(localStorage.token, secret)
        
        console.log("JWT DECODED IN CLIENT, CarForm.JSX: " + JSON.stringify(user.username))

        this.state = {
            name: '',
            price: 1234,
            owner: user.username,
            isPublic: false,
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeNewCar = this.writeNewCar.bind(this);

        
    }

    componentWillMount() {
        
        
    }

    //When the user input changes, set the newCarContent to the value of what's in the inputbox
    handleUserInput(e) {
        this.setState({
            name: e.target.value, //The value of the text input.
        })
    }

    writeNewCar() {
        this.props.addCar(this.state);
    }

    
    render() {
        return(
            <div className="formWrapper">
                <input className="noteInput"
                placeholder="Add a car to wishlist" 
                value={this.state.name}
                onChange={this.handleUserInput} />
                <button className="noteButton"
                onClick={this.writeNewCar}>Add Car</button>
            </div>
        )
    }


}

export default CarForm;