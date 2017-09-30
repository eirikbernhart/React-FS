import React, { Component } from 'react';
import './CarForm.css'

class CarForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            name: '',
            price: 1234,
            __v: 0
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
        //ID needs to be 24 chars long
        var randomID = this.scientificToDecimal((Math.floor(1000 + Math.random() * 900000000000000000000000)))
        console.log(randomID)

        this.state._id = randomID.toString();
        this.props.addCar(this.state);
       
        
    }

    //Implementation: https://gist.github.com/jiggzson/b5f489af9ad931e3d186 
    scientificToDecimal(num) {
    //if the number is in scientific notation remove it
    if(/\d+\.?\d*e[\+\-]*\d+/i.test(num)) {
        var zero = '0',
            parts = String(num).toLowerCase().split('e'), //split into coeff and exponent
            e = parts.pop(),//store the exponential part
            l = Math.abs(e), //get the number of zeros
            sign = e/l,
            coeff_array = parts[0].split('.');
        if(sign === -1) {
            num = zero + '.' + new Array(l).join(zero) + coeff_array.join('');
        }
        else {
            var dec = coeff_array[1];
            if(dec) l = l - dec.length;
            num = coeff_array.join('') + new Array(l+1).join(zero);
        }
    }
    return num;
};

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