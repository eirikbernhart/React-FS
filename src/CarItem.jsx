import React, { Component } from 'react';
import './CarItem.css';

class CarItem extends Component {

    constructor(props) {
        super(props);
        this.carName = props.car.name;
        this.id = props.car._id;
        this.handleRemoveCar = this.handleRemoveCar.bind(this);
    }

    handleRemoveCar(id) {
        //console.log("Hva er carName: " + id)
        this.props.removeCar(id);
    }

    //NEW IMPLEMENTATION
    render(props) {
        return (
            <div className="itemContent">
            {JSON.stringify(this.carName)}
            {JSON.stringify(this.id)}
            <span className="closebtn"
                onClick={() => this.handleRemoveCar(this.id)}>
                &times;
            </span>
        </div>
        );
    }
}

//ORIGINAL
/*const CarItem = (props) => {
    return (
        <div className="itemContent">
            {JSON.stringify(props.car.name)}
            <span className="closebtn"
                onClick={() => this.handleRemoveCar(this.carName)}>
                &times;
            </span>
        </div>
    );
}*/

export default CarItem;