import React, { Component } from 'react';
import './CarForm.css'

class CarForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: 1234,
            
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeNewCar = this.writeNewCar.bind(this);
    }

    //When the user input changes, set the newCarContent to the value of what's in the inputbox
    handleUserInput(e) {
        this.setState({
            name: e.target.value, //The value of the text input.
        })
    }

    writeNewCar() {
        // call a method that sets the noteContent for a note to the value of the input.
        this.props.addCar(this.state);
        this.state.name = ""
       
        
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